/**
 * AuO.js
 *
 * Version 1.5 (stable) distribution.
 *
 * Main entry point for the AuO library. Create a new instance of AuO by calling new AuO(). Calling
 * launch() adds the instance to the DOM tree, and calling suspend() removes the instance from the
 * DOM tree.
 *
 * To enable saving to a server, pass in a string containing the URL to upload the file to. AuO
 * uses secure POST-based file transfer, so make sure that the URL support that. For custom handling
 * of the callback after saving to the server, also pass in a function to the SAVE_CALLBACK
 * argument. This function will be passed the request object as its sole parameter, and calling
 * request.response will retrieve the response from the server. If no callback function is passed
 * in, the default callback (a prompt displaying the response of the server) will be used.
 *
 * If the SAVE_URL parameter is set to null, then local file handling launches upon save. This
 * results in a call to SAVE_CALLBACK with the blob as the parameter, instead of a server respond.
 * If SAVE_CALLBACK is null, then the default behavior is used, which is to prompt the user to
 * locally download the blob.
 *
 * The third parameter is the LOCAL_SAVE_CALLBACK handler, which will run for offline saves. The
 * default behavior is to prompt the user to save the track onto the local filesystem, but this can
 * be changed. LOCAL_SAVE_CALLBACK takes in the blob as its sole parameter.
 *
 * @constructor
 */
export function AuO(/* SAVE_URL = null, SAVE_CALLBACK = null, LOCAL_SAVE_CALLBACK */) {
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions in the AuO interface.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Launches this instance of AuO. Application becomes visible to the user. Will automatically
     * set the z-index so that the launched instance has higher z-index than all other elements on
     * the page.
     */
    this.launch = function () {
        const allElements = document.getElementsByTagName("*");
        const allElementsZindex = Array.from(allElements).map(function (element) {
            const zIndex = window.getComputedStyle(element).getPropertyValue("z-index");
            return isNaN(zIndex) ? 0 : zIndex;
        });
        const maxZindex = Math.max.apply(null, allElementsZindex);
        container.style("z-index", maxZindex + 1);
        document.body.appendChild(container.element());
        run();
    };

    /**
     * Suspends using this instance of AuO. Removes the application from the DOM tree and sets
     * the z-index to -Infinity. The interface is only hidden from view, however. To stop all
     * services, the instance itself must be deleted.
     */
    this.suspend = function () {
        suspendInstance();
    };

    this.reset = function () {
        stateReset();
    },

    this.setOnline = function (isOnline) {
        onlineResource(isOnline);
    },

    this.record = function () {
        onRecordClicked();
    },

    this.stop = function () {
        onStopClicked();
    },

    this.save = function () {
        onSaveClicked();
    },

    /**
     * Returns an array of the tagged times. All times are represented in milliseconds. The produced
     * array is a defensive copy, so the values can be freely changed without affecting AuO. These
     * times are relative to the trim amount at the time that this API function gets called, so
     * tags that fall outside the playable range will be dropped.
     */
    this.getTags = function () {
        const tags = {};
        for (var item in state.tags) {
            const time = item;
            if (time >= state.trimStart && time <= state.elapsedTime - state.trimEnd) {
                tags[parseInt(1000 * (time - state.trimStart))] = state.tags[time];
            }
        };
        return tags;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Variables for keeping track of the state.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const state = {
        running: false,
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Runtime code.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Runs this instance of AuO by initiating runtime procedures for this instance of AuO. Called
     * by this.launch().
     */
    const run = function () {
        if (state.running) {
            return;
        }

        runtimeAtInitiation();

        state.running = true;
    };

    /**
     * Suspends this AuO instance.
     */
    const suspendInstance = function () {
        if (!state.running) {
            return;
        }

        state.running = false;

        runtimeAtSuspension();
        container.detach().style("z-index", -Infinity);
    };

    /**
     * Resets the internal state of this AuO instance.
     */
    const stateReset = function () {
        state.audioBuffer = null;
        state.audioOnDrag = function () {};
        state.audioOnDrop = function () {};
        state.audioPlaybackCurrentTime = function () {
            return 0;
        };
        state.audioPlaybackSource = null;
        state.bindKeys = true;
        state.callbackDraw = null;
        state.callbackTag = null;
        state.data = [];
        state.dataIndicesProcessed = 0;
        state.dataSamplesProcessed = 0;
        state.dataUpdated = false;
        state.drawing = false;
        state.elapsedTime = 0;
        state.endRecording = false;
        state.playing = false;
        state.recording = false;
        state.tags = {};
        state.tagsSynced = false;
        state.trimEnd = 0;  // In seconds.
        state.trimStart = 0;  // In seconds.
        state.zoom = 0;
    };

    /**
     * Code run at the end of constructing a new AuO instance. Mostly for actions that require the
     * DOM tree to already exist.
     */
    const runtimeAtConstruction = function () {
        stateReset();

        addAudioDropHandlers();

        zoomUpdate();

        editorMode(false);

        // TODO: replace with navigator.mediaDrevices.getUserMedia API when it becomes available.
        navigator.getUserMedia({audio: "true"}, beginAudioRecording, console.error);
        audioContext.suspend();
    };

    /**
     * Code run at initiate step of an AuO instance.
     */
    const runtimeAtInitiation = function () {
        stateReset();
        audioContext.resume();

        // Draw the visual for the start trimming box.

        (function () {
            const context = audioStartTrimmerVisual.element().getContext("2d");

            const width = audioStartTrimmerVisual.element().clientWidth;
            const height = audioStartTrimmerVisual.element().clientHeight;
            audioStartTrimmerVisual.set("width", width.toString() + "px");
            audioStartTrimmerVisual.set("height", height.toString() + "px");

            context.fillStyle = "transparent";
            context.fillRect(0, 0, width, height);

            context.lineWidth = 5;
            context.strokeStyle = "rgba(0, 200, 200, 0.4)";
            context.beginPath();
            context.moveTo(context.lineWidth, context.lineWidth);
            context.lineTo(width - context.lineWidth, 0.5 * height);
            context.lineTo(context.lineWidth, height - context.lineWidth);
            context.stroke();
        })();

        // Draw the visual for the end trimming box.

        (function () {
            const context = audioEndTrimmerVisual.element().getContext("2d");

            const width = audioEndTrimmerVisual.element().clientWidth;
            const height = audioEndTrimmerVisual.element().clientHeight;
            audioEndTrimmerVisual.set("width", width);
            audioEndTrimmerVisual.set("height", height);

            context.fillStyle = "transparent";
            context.fillRect(0, 0, width, height);

            context.lineWidth = 5;
            context.strokeStyle = "rgba(0, 200, 200, 0.4)";
            context.beginPath();
            context.moveTo(width - context.lineWidth, context.lineWidth);
            context.lineTo(context.lineWidth, 0.5 * height);
            context.lineTo(width - context.lineWidth, height - context.lineWidth);
            context.stroke();
        })();

        // Ensures that the visualizer layer sits above the display itself.
        audioVisualizer.style("z-index", 1 + parseInt(container.element().style.zIndex));
        audioTicker.style("z-index", 2 + parseInt(container.element().style.zIndex));
        audioEndTrimmer.style("z-index", 2 + parseInt(container.element().style.zIndex));
        audioStartTrimmer.style("z-index", 2 + parseInt(container.element().style.zIndex));

        audioDisplay.set("height", audioDisplay.element().clientHeight);

        idleControls();

        onlineResource(false);

        beginAudioDisplayLoop();
        beginTagUpdateLoop();
        window.addEventListener("resize", animateAudioDisplayByForce);

        container.element().focus();
    };

    /**
     * Code run upon suspending an AuO instance. Does resource clean-up.
     */
    const runtimeAtSuspension = function () {
        if (!isNil(state.callbackDraw)) {
            clearInterval(state.callbackDraw);
            state.callbackDraw = null;
        }
        if (!isNil(state.callbackTagUpdate)) {
            clearInterval(state.callbackTagUpdate);
            state.callbackTagUpdate = null;
        }
        if (!isNil(state.audioPlaybackSource)) {
            state.audioPlaybackSource.stop();
            delete state.audioPlaybackSource;
            state.audioPlaybackSource = null;
        }
        window.removeEventListener("resize", animateAudioDisplayByForce);
        delete state.data;
        delete state.audioBuffer;
        audioContext.suspend();
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // General tools for working with the WebAudio and MediaStream APIs.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // TODO: Remove this once navigator.mediaDevices.getUserMedia becomes supported.
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions for audio UI display.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Begins and registers audio display loop.
     */
    const beginAudioDisplayLoop = function () {
        // If a loop is already ongoing, then do no thing.
        if (!isNil(state.callbackDraw)) {
            return;
        }

        const fps = 60;
        const millisecondsPerFrame = 1000 / fps;

        state.callbackDraw = setInterval(function () {
            if (true === state.dataUpdated) {
                window.requestAnimationFrame(animateAudioDisplay);
            }
            window.requestAnimationFrame(animateAudioTicker);
            window.requestAnimationFrame(animateAudioTrimmers);
        }, millisecondsPerFrame);
    };

    /**
     * Forces an animation frame update without interrupting the update loop if it's running.
     */
    const animateAudioDisplayByForce = function() {
        state.dataUpdated = true;
        animateAudioDisplay();
    };

    /**
     * Draws a frame for the audio display.
     */
    const animateAudioDisplay = function () {
        const viewWidth = audioUI.element().clientWidth - 2 * VISUALIZER_BUFFER;

        // We have new data to draw.
        if (!state.drawing && state.dataUpdated) {
            // Weak mutual exclusion.
            state.drawing = true;

            const data = state.data;

            // Cumulative time, number of series, and number of samples.
            const totalTime = state.elapsedTime;
            const totalSeries = data.length;
            for (var index = state.dataIndicesProcessed; index < totalSeries; index++) {
                state.dataSamplesProcessed += data[index][0].length;
            }
            state.dataIndicesProcessed = totalSeries;
            const totalSamples = state.dataSamplesProcessed;

            if (0 < totalSeries) {
                audioDisplay.resize(data[0].length);
            }

            // Resize display canvas and visualizer layer.
            const width = zoomFactor() * viewWidth;
            audioDisplay.style("width", width.toString() + "px");
            audioDisplay.set("width", width);
            audioVisualizer.style("width", (width + 2 * VISUALIZER_BUFFER).toString() + "px");
            const canvasWidth = audioDisplay.get("width");
            const canvasHeight = audioDisplay.get("height");

            // Reset canvas.
            const canvases = [];
            for (var i = 0; i < audioDisplay.count(); i++) {
                canvases.push(audioDisplay.element(i).getContext("2d"));
            }
            for (var item of canvases) {
                const canvas = item;
                canvas.clearRect(0, 0, canvasWidth, canvasHeight);
                canvas.lineWidth = 1;
                canvas.strokeStyle = "rgb(0, 0, 0)";
                canvas.beginPath();
            }

            // Determine the rate of samples being drawn.
            const samplesPerInterval = Math.max(1, Math.round(totalSamples / canvasWidth));

            // Compute time steps. We want 10 time values drawn in a view window.
            const timeStep = viewWidth * totalTime / canvasWidth / 10;
            const fixPoint = Math.min(6, Math.max(0, parseInt(2 - Math.log(timeStep) / Math.log(10))));

            const seriesAllTheSameLength = (0 === totalSeries) || (function () {
                const length = data[0][0].length;
                for (var seriesIndex = 1; seriesIndex < totalSeries; seriesIndex++) {
                    if (length !== data[seriesIndex][0].length) {
                        return false;
                    }
                }
                return true;
            })();

            // Iterate along intervals and retrieve data to plot.
            var seriesIndex = 0, itemIndex = 0;
            for (var sample = 0; sample < totalSamples; sample += samplesPerInterval) {
                if (seriesAllTheSameLength) {
                    seriesIndex = parseInt(sample / data[0][0].length);
                    itemIndex = sample % data[seriesIndex][0].length;
                } else {
                    while (seriesIndex < totalSeries) {
                        // We have found our series and corresponding data.
                        if (itemIndex < data[seriesIndex][0].length) {
                            break;
                        }

                        // Otherwise, look in the next series.
                        itemIndex -= data[seriesIndex][0].length;
                        seriesIndex++;
                    }

                    // Increment itemIndex.
                    itemIndex += samplesPerInterval;
                }

                const x = sample * zoomFactor() * viewWidth / totalSamples;
                for (var channel = 0; channel < canvases.length; channel++) {
                    const canvas = canvases[channel];
                    const value = data[seriesIndex][channel][itemIndex];
                    const y = 0.5 * (1 - value) * canvasHeight;

                    if (0 === sample) {
                        canvas.moveTo(x, y);
                    } else {
                        canvas.lineTo(x, y);
                    }
                }
            }

            // Draw time labels.
            for (var time = 0; time < totalTime + timeStep; time += timeStep) {
                const x = time * zoomFactor() * viewWidth / totalTime;
                const displayString = time.toFixed(fixPoint) + "s";
                for (var item of canvases) {
                    const canvas = item;
                    canvas.font = "10px serif";
                    canvas.fillText(displayString, x - 2.5 * displayString.length, canvasHeight);
                }
            }

            for (var item of canvases) {
                const canvas = item;
                canvas.stroke();

                canvas.fillStyle = "rgba(50, 150, 50, 0.5)";
                canvas.fillRect(-1, 0, 2, canvasHeight);
                canvas.fillRect(canvasWidth - 1, 0, 2, canvasHeight);
            }

            state.dataUpdated = false;
            state.drawing = false;
        }
    };

    /**
     * Animates and moves the current time ticker.
     */
    const animateAudioTicker = function () {
        const currentTime = Math.max(state.trimStart, Math.min(state.elapsedTime - state.trimEnd,
            state.audioPlaybackCurrentTime()));
        const canvasWidth = audioDisplay.get("width");
        const tickerWidth = audioTicker.element().offsetWidth;
        const tickerRawOffset = convertUnits(currentTime, state.elapsedTime, canvasWidth);
        const tickerOffset = Math.max(0, Math.min(canvasWidth, tickerRawOffset));
        const tickerLocation = tickerOffset + VISUALIZER_BUFFER - 0.5 * tickerWidth;

        // Move and label the ticker.
        audioTicker.style("left", tickerLocation.toString() + "px");
        audioTickerLabel.set("innerHTML", currentTime.toFixed(2) + "s");

        // Move the ticker label to the correct side of the bar.
        if (tickerOffset <= 0.5 * canvasWidth) {
            audioTicker.style("direction", "ltr");
            audioTickerLabel.style("margin-left", "calc(100% + 4px)");
            audioTickerLabel.style("margin-right", "0px");
        } else {
            audioTicker.style("direction", "rtl");
            audioTickerLabel.style("margin-left", "0px");
            audioTickerLabel.style("margin-right", "calc(100% + 4px)");
        }
    };

    /**
     * Animates and resizes the trimmer boxes.
     */
    const animateAudioTrimmers = function () {
        const canvasWidth = audioDisplay.get("width");
        const uiWidth = audioUI.element().clientWidth;
        const visualizerWidth = audioVisualizer.element().clientWidth;

        // Update the start trimming box.
        const startTime = state.trimStart;
        const startWidth = audioStartTrimmer.element().clientWidth;
        const startBorderWidth = audioStartTrimmer.element().offsetWidth - startWidth;
        const startNewWidth = convertUnits(startTime, state.elapsedTime, canvasWidth) +
            VISUALIZER_BUFFER - startBorderWidth;
        audioStartTrimmer.style("width", startNewWidth.toString() + "px");
        audioStartTrimmerLabel.set("innerHTML", startTime.toFixed(2) + "s");

        // Update the end trimming box.
        const endTime = state.trimEnd;
        const endWidth = audioStartTrimmer.element().clientWidth;
        const endBorderWidth = audioStartTrimmer.element().offsetWidth - endWidth;
        const endNewWidth = convertUnits(endTime, state.elapsedTime, canvasWidth) +
            VISUALIZER_BUFFER - endBorderWidth;
        audioEndTrimmer.style("right", (uiWidth - visualizerWidth).toString() + "px");
        audioEndTrimmer.style("width", endNewWidth.toString() + "px");
        audioEndTrimmerLabel.set("innerHTML", "-" + endTime.toFixed(2) + "s");
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions for audio recording.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Sets up audio recording functionalities. Is passed into getUserMedia().
     */
    const beginAudioRecording = function (stream) {
        const streamSource = audioContext.createMediaStreamSource(stream);

        // TODO: update this to use AudioWorkerNode once it becomes an available API
        // Set up the script node for intercepting the PCM data from the microphone
        const recordingBufferNode = audioContext.createScriptProcessor(0, 1, 1);
        recordingBufferNode.onaudioprocess = processAudioRecording;

        // Necessary to complete the stream so that the data actually streams through the
        // bufferNode.
        const mockDestinationNode = audioContext.createMediaStreamDestination();

        streamSource.connect(recordingBufferNode);
        recordingBufferNode.connect(mockDestinationNode);
    };

    /**
     * Postprocessing after audio recording ends. Called when stopping recording.
     */
    const endAudioRecording = function () {
        const dataLength = state.dataSamplesProcessed;
        const sampleRate = audioContext.sampleRate;

        // Deallocate resources for the old buffer if old data has been buffered.
        if (!isNil(state.audioBuffer)) {
            delete state.audioBuffer;
        }

        // We have only one channel.
        const numberOfChannels = audioDisplay.count();

        // Create the buffer upon completion of recording.
        state.audioBuffer = audioContext.createBuffer(numberOfChannels, dataLength, sampleRate);

        // Populate the buffer.
        var sample = 0;
        for (var dataItem of state.data) {
            const series = dataItem;
            for (var item = 0; item < series[0].length; item++) {
                for (var channel = 0; channel < numberOfChannels; channel++) {
                    const value = series[channel][item];
                    state.audioBuffer.getChannelData(channel)[sample] = value;
                }
                sample++;
            }
        }
    };

    /**
     * Processing function for recording process's script processor node.
     */
    const processAudioRecording = function (event) {
        const recording = state.recording;
        const endRecording = state.endRecording;

        state.recording = state.recording && !endRecording;
        state.endRecording = recording && state.endRecording;

        const inputBuffer = event.inputBuffer;
        const outputBuffer = event.outputBuffer;

        const numberOfChannels = inputBuffer.numberOfChannels;

        if (recording) {
            state.elapsedTime += inputBuffer.duration;

            // Shallow-copies data and pushes it into our stored data.
            const data = [];
            for (var channel = 0; channel < numberOfChannels; channel++) {
                data.push(inputBuffer.getChannelData(channel).slice());
            }
            state.data.push(data);
            state.dataUpdated = true;
        } else if (endRecording) {
            setTimeout(function () {
                endAudioRecording();

                // Reset UI to indicate that post-processing of recording has completed.
                editorMode(true);
                idleControls();
            }, 0);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions for audio playback.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Takes in start and end times to play back the recording between those. Defaults to playing
     * the entire recording if no parameters are passed in.
     */
    const beginAudioPlayback = function (/* start = 0, end = Infinity */) {
        const start = getArgument(arguments, 0, 0);
        var endTime = getArgument(arguments, 1, Infinity);
        if (Infinity === endTime) {
            endTime = state.elapsedTime;
        }

        // Re-compute the full buffer if it is missing elements.
        if (state.audioBuffer.length < state.dataSamplesProcessed) {
            buttonPlay.set("innerHTML", "Processing...");
            endAudioRecording();
            buttonPlay.set("innerHTML", "Play");
        }

        // Connect the buffer to the speaker.
        const playbackBuffer = state.audioBuffer;
        const playbackSource = audioContext.createBufferSource();
        playbackSource.buffer = playbackBuffer;
        playbackSource.onended = function (event) {
            buttonStop.element().click();
        };
        if (!isNil(state.audioPlaybackSource)) {
            delete state.audioPlaybackSource;
        }
        state.audioPlaybackSource = playbackSource;
        playbackSource.connect(audioContext.destination);

        const playbackStartTime = audioContext.currentTime;
        playbackSource.start(playbackStartTime, start, endTime - start);
        state.audioPlaybackCurrentTime = function () {
            return Math.max(0, audioContext.currentTime - playbackStartTime + start);
        };
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions for loading audio into the editor.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Loads an audio file, from either the local filesystem or retrieved over the Internet, into
     * the buffer as if it were just recorded, using the file selected in the file selector or at
     * the given URL.
     */
    const beginAudioLoad = function (files) {
        if (state.online) {
            // Convert URLs to file objects.
            const request = new XMLHttpRequest();
            request.open("GET", files[0], true);  // There should only be one URL to load.
            request.responseType = "blob";
            request.onload = function (event) {
                if (this.status >= 200 && this.status < 300) {
                    const type = this.getResponseHeader("content-type");
                    if (getSupportedMediaTypes().includes(type)) {
                        loadArrayOfBlobs([this.response]);
                    } else {
                        idleControls();
                        alert("Response from " + files[0] + " is not a supported audio type.");
                    }
                } else {
                    console.error(event);
                    idleControls();
                    alert("An error occurred while trying to load from " + files[0] + ".");
                }
            };
            request.onerror = function (event) {
                console.error(event);
                idleControls();
                alert("An error occurred while trying to load from " + files[0] + ".");
            };
            request.send();
        } else {
            loadArrayOfBlobs(files);
        }

        loadFile.element().value = null;
    };

    /**
     * Helper function for processing load via blobs.
     */
    const loadArrayOfBlobs = function (blobs) {
        // Read in blobs.
        for (var item of blobs) {
            const blob = item;
            const loadReader = new FileReader();
            loadReader.onload = function (event) {
                const audioData = event.target.result;
                audioContext.decodeAudioData(audioData).then(function (buffer) {
                    stateReset();

                    const data = [];
                    for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
                        data.push(buffer.getChannelData(channel));
                    }

                    state.audioBuffer = buffer;
                    state.data = [data];
                    state.elapsedTime = buffer.duration;
                    state.dataUpdated = true;

                    editorMode(true);
                    idleControls();
                }).catch(function (event) {
                    console.error(event);
                    alert("Audio file badly formatted. File " + blob.name + " cannot be loaded.");

                    editorMode(true);
                    idleControls();
                });
            };
            loadReader.readAsArrayBuffer(blob);

            // TODO: Determine multiple-upload behavior and remove this line.
            break;  // Only deal with first blob.
        }
    };

    /**
     * Handler for when a file has been loaded or URL has been entered.
     */
    const loadFileHandler = function (event) {
        if (state.online) {
            const url = loadFile.element().value;
            const validity = loadFile.element().validity;
            toggleInput(buttonLoad, 0 < url.length && validity.valid);
        } else {
            const files = loadFile.element().files;
            if (0 < files.length) {
                const selections = Array.prototype.reduce.call(files, function (prev, file) {
                    prev.push(file.name);
                    return prev;
                }, []);
                loadFileLabel.set("innerHTML", selections.sort().join("<br />"));
                toggleInput(buttonLoad);
                buttonLoad.element().focus();
            } else {
                loadFileLabel.set("innerHTML", "Click here to select file");
                toggleInput(buttonLoad, false);
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions for saving an audio recording as a file.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Produces a Blob that is the audio sample from start to finish. Once the file is ready, will
     * pass the file in as the parameter to the function onready. The start and end are given in
     * units of time (seconds).
     */
    const beginAudioSave = function (onready /* , start = 0, end = Infinity */) {
        const start = getArgument(arguments, 1, 0);
        var endTime = getArgument(arguments, 2, Infinity);
        if (Infinity === endTime) {
            endTime = state.elapsedTime;
        }

        // Re-compute the full buffer if it is missing elements.
        if (state.audioBuffer.length < state.dataSamplesProcessed) {
            endAudioRecording();
        }

        // Create a stream destination node and a MediaRecorder to use its stream.
        const saveBuffer = state.audioBuffer;

        const format = saveFormat();
        if ("wav" === format) {
            // Format in http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/WAVE.html .

            const bytesPerSample = saveBuffer.getChannelData(0).__proto__.BYTES_PER_ELEMENT;
            const numChannels = saveBuffer.numberOfChannels;
            const sampleRate = saveBuffer.sampleRate;

            const startSample = Math.max(0, Math.round(start * sampleRate));
            const endSample = Math.min(saveBuffer.length, Math.round(endTime * sampleRate));
            const totalSamples = endSample - startSample;

            const blockAlign = bytesPerSample * numChannels;
            const byteRate = bytesPerSample * numChannels * sampleRate;
            const dataBytes = bytesPerSample * numChannels * totalSamples;
            const sampleLength = numChannels * totalSamples;

            // Chunk size = 4 + 48 + 12 + (8 + dataBytes + (dataBytes % 2)).
            const chunkSize = 4 + 48 + 12 + (8 + dataBytes + (dataBytes % 2));

            /**
             * Returns an array of the first blocks-th bytes of the value, in little-endian form.
             * The magic value 256 is the number of values in each byte block.
             */
            const getBytes = function (value, blocks) {
                const bytes = new Uint8Array(blocks);
                for (var i = 0; i < blocks; i++) {
                    bytes[i] = value % 256;
                    value /= 256;
                }
                return bytes;
            };
            const buffer = new ArrayBuffer(58 + dataBytes)
            const data = new Uint8Array(buffer);

            // Header (58 bytes).
            data.set([0x52, 0x49, 0x46, 0x46], 0);  // Chunk ID = "RIFF".
            data.set(getBytes(chunkSize, 4), 4);  // Chunk size.
            data.set([0x57, 0x41, 0x56, 0x45], 8);  // Wave ID = "WAVE".

            data.set([0x66, 0x6d, 0x74, 0x20], 12);  // Subchunk1 ID = "fmt ".
            data.set([0x12, 0x00, 0x00, 0x00], 16);  // Subchunk1 size = 18.
            data.set([0x03, 0x00], 20);  // AudioFormat = 0x0003 = WAVE_FORMAT_IEEE_FLOAT.
            data.set(getBytes(numChannels, 2), 22);  // Number of channels.
            data.set(getBytes(sampleRate, 4), 24);  // Samples per second.
            data.set(getBytes(byteRate, 4), 28);  // Bytes per second.
            data.set(getBytes(blockAlign, 2), 32);  // Block align.
            data.set(getBytes(8 * bytesPerSample, 2), 34);  // Bits per sample.
            data.set([0x00, 0x00], 36);  // Size of the extension = 0.

            data.set([0x66, 0x61, 0x63, 0x74], 38);  // Subchunk2 ID = "fact".
            data.set([0x04, 0x00, 0x00, 0x00], 42);  // Subchunk2 size = 4.
            data.set(getBytes(sampleLength, 4), 46);  // Sample length.

            data.set([0x64, 0x61, 0x74, 0x61], 50);  // Subchunk3 ID = "data".
            data.set(getBytes(dataBytes, 4), 54);  // Subchunk3 size = number of data bytes.

            // Data body (dataBytes bytes). Padding automatically during initialization to 0.
            for (var sample = 0; sample < totalSamples; sample++) {
                const frame = new Uint8Array(blockAlign);
                for (var channel = 0; channel < numChannels; channel++) {
                    // Convert from the float32 array data to the uint8 data.
                    const buffer = new ArrayBuffer(4);
                    const floatView = new Float32Array(buffer);
                    floatView[0] = saveBuffer.getChannelData(channel)[startSample + sample];
                    const channelData = new Uint8Array(buffer);
                    frame.set(channelData, bytesPerSample * channel);
                }
                data.set(frame, 58 + blockAlign * sample);
            }

            const saveBlob = new Blob([buffer], {"type": "audio/wav; codecs=pcm"});
            onready(saveBlob);
        } else if ("webm" === format) {
            const saveDestination = audioContext.createMediaStreamDestination();
            const saveRecorder = new MediaRecorder(saveDestination.stream);
            saveRecorder.onerror = console.error;
            saveRecorder.onwarning = console.error;

            // Connect the buffer to the speaker.
            const saveSource = audioContext.createBufferSource();
            saveSource.buffer = saveBuffer;
            saveSource.connect(saveDestination);

            // Create a buffer for all the blobs.
            const saveBlobs = [];
            saveRecorder.ondataavailable = function (event) {
                saveBlobs.push(event.data);
            };

            saveRecorder.onstop = function (event) {
                const saveBlob = new Blob(saveBlobs, {"type": "audio/webm; codecs=opus"});
                onready(saveBlob);
            };

            saveSource.onended = function (event) {
                saveRecorder.stop();
            };

            saveRecorder.start();
            saveSource.start(audioContext.currentTime, start, end - start);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions for keeping the tag UI updated.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    const beginTagUpdateLoop = function () {
        const fps = 60;
        const millisecondsPerFrame = 1000 / fps;

        state.callbackTagUpdate = setInterval(function () {
            if (!state.tagsSynced) {
                state.tagsSynced = true;
                window.requestAnimationFrame(tagsUpdateUI);
            }
        }, millisecondsPerFrame);
    };

    /**
     * Updates the tags UI.
     */
    const tagsUpdateUI = function () {
        const list = tagList.element();

        const tags = [];
        for (var item in state.tags) {
            const time = item;
            tags.push({time: time, label: state.tags[time]});
        }
        tags.sort(function (a, b) {
            return a.time - b.time;
        });
        const listChildren = [...list.children];  // Defensive copy to avoid messy indices.

        // Indexing variables for iterating through the tags and the elements.
        var tagIndex = 0, eleIndex = 0;
        while (tags.length > tagIndex && listChildren.length > eleIndex) {
            const tagLabel = tags[tagIndex].label;
            const tagTime = tags[tagIndex].time;
            const eleLabel = listChildren[eleIndex].textContent;
            const eleTime = parseFloat(listChildren[eleIndex].getAttribute("value"));

            // Using listChildren lets us avoid dealing with messy indices.
            switch (tagTime > eleTime ? 1 : (tagTime < eleTime ? -1 : 0)) {
                case 1:
                    list.removeChild(listChildren[eleIndex]);
                    eleIndex++;
                    break;
                case -1:
                    list.insertBefore(tagCreateLabel(tagTime, tagLabel).element(),
                        listChildren[eleIndex]);
                    tagIndex++;
                    break;
                case 0:
                    listChildren[eleIndex].innerHTML = tagLabel;
                    eleIndex++;
                    tagIndex++;
                    break;
                default:
                    throw "Invalid tagLabelComparator return value.";
            }
        }

        // Remove the trailing deleted tags.
        while (listChildren.length > eleIndex) {
            list.removeChild(listChildren[eleIndex]);
            eleIndex++;
        }

        // Add the trailing new tags.
        while (tags.length > tagIndex) {
            tagList.append(tagCreateLabel(tags[tagIndex].time, tags[tagIndex].label));
            tagIndex++;
        }
    };

    /**
     * Compares two tag labels via natural sort. Returns -1 if the first precedes, 1 if the first
     * succeeds, and 0 if the two are equal.
     */
    const tagLabelComparator = function (labelA, labelB /* , timeA = 0, timeB = 0 */) {
        const timeA = getArgument(arguments, 2, 0);
        const timeB = getArgument(arguments, 3, 0);
        const regex = /(\d*\.\d+|\d+\.?|((?!\d*\.\d+|\d+\.?).)+)/g;
        const numericRegex = /\d*\.\d+|\d+\.?/g;
        const tokensA = labelA.match(regex);
        const tokensB = labelB.match(regex);
        var i;
        for (i = 0; tokensA.length > i && tokensB.length > i; i++) {
            const tokenA = tokensA[i];
            const tokenB = tokensB[i];
            if (numericRegex.test(tokenA) && numericRegex.test(tokenB)) {
                const numA = parseFloat(tokenA);
                const numB = parseFloat(tokenB);
                if (numA !== numB) {
                    return numA < numB ? -1 : 1;
                }
            } else {
                const compare = tokenA.localeCompare(tokenB);
                if (0 !== compare) {
                    return compare < 0 ? -1 : 1;
                }
            }
        }

        if (tokensA.length > i) {
            return 1;
        } else if (tokensB.length > i) {
            return -1;
        }
        
        return timeA > timeB ? 1 : (timeA < timeB ? -1 : 0);
    };

    /**
     * Creates a new tag label element for the given time.
     */
    const tagCreateLabel = function (time, label) {
        const titleMessage = "(" + parseFloat(time).toFixed(3) + "s) " +
            "Left-click to jump to tagged time, shift-click to delete tag. " +
            "Re-tag the same time to change the label.";
        return new FunctionalElement("label")
            .set("innerHTML", label.replace(/ /g, "&nbsp;"))
            .set("title", titleMessage)
            .set("value", time)
            .listen("click", tagClickHandler);
    };

    /**
     * Event handler for click tagging.
     */
    const tagClickHandler = function (event) {
        const time = parseFloat(this.getAttribute("value"));
        if (event.shiftKey) {  // Delete.
            delete state.tags[time];
            state.tagsSynced = false;
        } else if (tagUI.element().classList.contains("idle")) {  // Jump only in idle state.
            state.audioPlaybackCurrentTime = function () {
                return time;
            };
        }
    };
 
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Functions for using hotkeys.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handler for hotkeys via the container.
     */
    const hotkeyHandler = function (event) {
        // Do not bind if key binding flag is off.
        if (!state.bindKeys) {
            return;
        }

        // Ignore key bindings on input elements.
        if (event.target.tagName.match(/^input$/i)) {
            return;
        }

        const maxScroll = audioVisualizer.element().clientWidth - audioUI.element().clientWidth;
        const hasModifier = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

        switch (event.code) {
            case "ArrowLeft":  // Left arrow key.
                if (event.ctrlKey) {  // Ctrl key.
                    const currentScroll = parseInt(audioUI.element().scrollLeft);
                    const scrollAmount = 0.1 * maxScroll;
                    const scroll = Math.max(0, currentScroll - scrollAmount);
                    audioUI.element().scrollLeft = scroll;
                } else if (event.shiftKey) {  // Shift key.
                    if (!(state.playing || state.recording)) {
                        const currentTime =
                            Math.max(state.trimStart, Math.min(state.elapsedTime - state.trimEnd,
                            state.audioPlaybackCurrentTime()));
                        const dt = convertUnits(100, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const time = Math.max(0, currentTime - dt);
                        state.audioPlaybackCurrentTime = function () {
                            return time;
                        };
                    }
                } else if (!hasModifier) {  // No modifiers.
                    if (!(state.playing || state.recording)) {
                        const currentTime =
                            Math.max(state.trimStart, Math.min(state.elapsedTime - state.trimEnd,
                            state.audioPlaybackCurrentTime()));
                        const dt = convertUnits(1, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const time = Math.max(0, currentTime - dt);
                        state.audioPlaybackCurrentTime = function () {
                            return time;
                        };
                    }
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "ArrowRight":  // Right arrow key.
                if (event.ctrlKey) {  // Ctrl key.
                    const currentScroll = parseInt(audioUI.element().scrollLeft);
                    const scrollAmount = 0.1 * maxScroll;
                    const scroll = Math.min(maxScroll, currentScroll + scrollAmount);
                    audioUI.element().scrollLeft = scroll;
                } else if (event.shiftKey) {  // Shift key.
                    if (!(state.playing || state.recording)) {
                        const currentTime =
                            Math.max(state.trimStart, Math.min(state.elapsedTime - state.trimEnd,
                            state.audioPlaybackCurrentTime()));
                        const dt = convertUnits(100, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const time = Math.min(state.elapsedTime, currentTime + dt);
                        state.audioPlaybackCurrentTime = function () {
                            return time;
                        };
                    }
                } else if (!hasModifier) {  // No modifiers.
                    if (!(state.playing || state.recording)) {
                        const currentTime =
                            Math.max(state.trimStart, Math.min(state.elapsedTime - state.trimEnd,
                            state.audioPlaybackCurrentTime()));
                        const dt = convertUnits(1, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const time = Math.min(state.elapsedTime, currentTime + dt);
                        state.audioPlaybackCurrentTime = function () {
                            return time;
                        };
                    }
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "BracketLeft":
                if (!(state.playing || state.recording)) {
                    if (event.shiftKey) {  // Shift key.
                        const dt = convertUnits(10, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const minTime = 0;
                        const maxTime = state.elapsedTime - state.trimEnd;
                        state.trimStart =
                            Math.max(minTime, Math.min(maxTime, state.trimStart - dt));
                    } else if (!hasModifier) {  // No modifiers.
                        const dt = convertUnits(10, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const minTime = 0;
                        const maxTime = state.elapsedTime - state.trimEnd;
                        state.trimStart =
                            Math.max(minTime, Math.min(maxTime, state.trimStart + dt));
                    } else {  // No binding to other modifiers.
                        return;
                    }
                } else {  // No binding when not in correct state.
                    return;
                }
                break;
            case "BracketRight":
                if (!(state.playing || state.recording)) {
                    if (event.shiftKey) {  // Shift key.
                        const dt = convertUnits(10, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const minTime = 0;
                        const maxTime = state.elapsedTime - state.trimStart;
                        state.trimEnd = Math.max(minTime, Math.min(maxTime, state.trimEnd - dt));
                    } else if (!hasModifier) {  // No modifiers.
                        const dt = convertUnits(10, audioVisualizer.element().clientWidth,
                            state.elapsedTime);
                        const minTime = 0;
                        const maxTime = state.elapsedTime - state.trimStart;
                        state.trimEnd = Math.max(minTime, Math.min(maxTime, state.trimEnd + dt));
                    } else {  // No binding to other modifiers.
                        return;
                    }
                } else {  // No binding when not in correct state.
                    return;
                }
                break;
            case "Digit0":  // 0 or ) key.
            case "Numpad0":  // 0 on number pad.
                if (!hasModifier) {  // No modifiers.
                    buttonZoomReset.element().click();
                } else {  // No binding to modifiers.
                    return;
                }
                break;
            case "Enter":  // Return key.
            case "NumpadEnter":  // Return key on number pad.
                if (loadFile.element() === document.activeElement) {
                    if (!hasModifier) {  // No modifiers.
                        buttonLoad.click();
                    } else {  // No binding to modifiers.
                        return;
                    }
                } else {  // Do not bind if not on loadFile element.
                    return;
                }
                break;
            case "Equal":  // + or = key.
            case "NumpadAdd":  // + on number pad.
                if (event.shiftKey || !hasModifier) {  // + or =.
                    buttonZoomIn.element().click();
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "KeyF":  // F key.
                if (event.shiftKey || !hasModifier) {  // F or f.
                    const x = convertUnits(state.audioPlaybackCurrentTime(), state.elapsedTime,
                        audioVisualizer.element().clientWidth) -
                        0.5 * audioUI.element().clientWidth;
                    const scroll = Math.max(0, Math.min(maxScroll, x));
                    audioUI.element().scrollLeft = scroll;
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "KeyL":  // L key.
                if (event.shiftKey || !hasModifier) {  // L or l.
                    if (state.online) {
                        loadFile.element().focus();
                    } else {
                        loadFileLabel.element().click();
                    }
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "KeyO":  // O key.
                if (event.shiftKey || !hasModifier) {  // O or o.
                    onlineResource(!state.online);
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "KeyR":  // R key.
                if (event.shiftKey || !hasModifier) {  // R or r.
                    buttonRecord.element().click();
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "KeyS":  // S key.
                if (event.shiftKey || !hasModifier) {  // S or s.
                    buttonSave.element().click();
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "KeyT":  // T key.
                if (event.shiftKey || !hasModifier) {  // T or t.
                    buttonTag.element().click();
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "Minus":  // - or _ key.
            case "NumpadSubtract":  // - on number pad.
                if (event.shiftKey || !hasModifier) {  // - or _.
                    buttonZoomOut.element().click();
                } else {  // No binding to other modifiers.
                    return;
                }
                break;
            case "Space":  // Spacebar.
                if (!hasModifier) {  // No modifiers.
                    (state.playing || state.recording ? buttonStop : buttonPlay).element().click();
                } else {  // No binding to modifiers.
                    return;
                }
                break;

            // Keys we don't want to bind to.
            default:
                return;
                break;
        }

        event.preventDefault();
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Helper functions for the entire library.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the name of the browser. Returns "Unknown" if the browser name isn't identified.
     */
    const browserName = function () {
        if (!isNil(navigator.userAgent.match(/Chrome/))) {
            return "Chrome";
        } else if (!isNil(navigator.userAgent.match(/Firefox/))) {
            return "Firefox";
        }
        return "Unknown";
    };

    /**
     * Returns the browser version number. Returns "-0.Unknown.-0" if the version isn't identified.
     */
    const browserVersion = function () {
        const chromeMatches = navigator.userAgent.match(/Chrome\/([0-9.]+)/);
        if (!isNil(chromeMatches)) {
            return chromeMatches[1];
        }

        const firefoxMatches = navigator.userAgent.match(/Firefox\/([0-9.]+)/);
        if (!isNil(firefoxMatches)) {
            return firefoxMatches[1];
        }

        return "-0.Unknown.-0";
    };

    /**
     * Returns the browser's major version number as an integer.
     */
    const browserVersionMajor = function () {
        const matches = browserVersion().match(/^\d+/);
        return parseInt(matches[0]);
    };

    /**
     * Changes the load label to the parameter string. If the string is nil or unset, will reset to
     * the default message, "Click here to select file".
     */
    const changeLoadLabel = function (/* message = null */) {
        const message = getArgument(arguments, 0, null);
        if (isNil(message)) {
            loadFileLabel.set("innerHTML", "Click here to select file.");
            loadFile.element().value = null;
        } else {
            loadFileLabel.set("innerHTML", message);
        }
    };

    /**
     * Convert from some unit to some other unit, with the given base scalings that correspond to 1.
     */
    const convertUnits = function (valueFrom, baseFrom, baseTo) {
        return (0 === valueFrom ? 0 : valueFrom * baseTo / baseFrom);
    };

    /**
     * Creates a custom AuO modal. Requires an inner FunctionalElement tree to be passed in as the
     * parameter. A modal also has the specal functions, launch() and close(), which launch and
     * close the modal, respecively.
     */
    const createModal = function (tree) {
        const modal = new FunctionalElement("div")
            .style("z-index",
                window.getComputedStyle(container.element()).getPropertyValue("z-index") + 4)
            .class(css_namespace)
            .append(new FunctionalElement("div").class("middle-container")
                .append(new FunctionalElement("div").class("center-container")
                    .append(new FunctionalElement("div")
                        .style("display", "inline-block")
                        .style("margin", "auto")
                        .style("width", "auto")
                        .class("auo-main-ui")
                        .append(tree)
                    )
                )
            )
            .listen("keydown", function (event) {
                if ("Escape" === event.code) {
                    modal.close();
                }
            });
        modal.launch = function () {
            state.bindKeys = false;
            modal.attach(mainUI);
        };
        modal.close = function () {
            modal.detach();
            state.bindKeys = true;
            container.element().focus();
        };
        return modal;
    };

    /**
     * Enables and disables editor mode, which determines whether editing features are on.
     */
    const editorMode = function (/* on = true */) {
        const on = getArgument(arguments, 0, true);
        state.editor = on;
        audioEndTrimmer.set("draggable", on);
        audioStartTrimmer.set("draggable", on);
        audioTicker.set("draggable", on);
    };

    /**
     * Function for setting default argument values. Retrieves an argument's value from the calling
     * function's argument list, or returns the default value if there is no such argument. This is
     * done for the sake of support Safari et al, which don't support default values for function
     * arguments.
     *
     * For documentation purposes, functions using default arguments should leave the default
     * argument list in the function declaration, but commented out using block comments. This shows
     * callers the calling API, even though the actual handling of arguments has changed.
     *
     * arguments -- the arguments of the caller function. Used instead of
     *     getArgument.caller.arguments to have wider support capabilities.
     * index -- the index of the argument whose value we are retrieving.
     * default_value -- the default value if the argument was not passed to the caller.
     */
    const getArgument = function (args, index, default_value) {
        return index < args.length ? args[index] : default_value;
    };

    /**
     * Returns an array of file extensions that are supported. These correspond to the MIME types
     * specified in getSupportedMIMEs().
     */
    const getSupportedExtensions = function () {
        return [
            ".aac",
            ".m4a",
            ".m4p",
            ".m4r",
            ".mp3",
            ".mp4",
            ".mpa",
            ".mpe",
            ".mpeg",
            ".mpg",
            ".ogg",
            ".ogv",
            ".wav",
            ".wave",
            ".webm",
        ];
    };

    /**
     * Returns an array of MIME types that are supported. Some video codecs are supported as well,
     * though the video track will be lost on save.
     */
    const getSupportedMIMEs = function () {
        return [
            "audio/aac",
            "audio/m4p",
            "audio/mp3",
            "audio/mp4",
            "audio/mpeg",
            "audio/ogg",
            "audio/wav",
            "audio/wave",
            "audio/webm",
            "audio/x-aac",
            "audio/x-m4a",
            "audio/x-pn-wav",
            "audio/x-wav",
            "video/mp4",
            "video/mpeg",
            "video/ogg",
            "video/webm",
        ];
    };

    /**
     * Returns an array of both the MIME types and file extensions that are supported. This allows
     * for easier creation of accepts in file input elements.
     */
    const getSupportedMediaTypes = function () {
        return getSupportedMIMEs().concat(getSupportedExtensions());
    };

    /**
     * Helper function that resets all control UI buttons into the idle state. Resets the innerHTML
     * content and the disabled statuses. Will automatically check for the launch state vs idle
     * state and appropriate enable or disable the buttons.
     */
    const idleControls = function() {
        buttonRecord.set("innerHTML", "Record");
        buttonPlay.set("innerHTML", "Play");
        buttonStop.set("innerHTML", "Stop");
        changeLoadLabel();
        buttonLoad.set("innerHTML", state.online ? "Fetch" : "Load");
        buttonSave.set("innerHTML", state.online ? "Upload" : "Download");

        toggleInput(buttonRecord);
        toggleInput(buttonPlay, !isNil(state.audioBuffer));
        toggleInput(buttonStop, false);
        toggleInput(buttonLoad, false);
        toggleInput(loadFile);
        toggleInput(buttonSave, !(isNil(SAVE_URL) && state.online || isNil(state.audioBuffer)));
        toggleInput(saveOptions);

        tagUI.class("idle");

        // Throw focus back to the first input or button element of the modal if one is up.
        const modal = mainUI.element().querySelector(".AuO");
        if (!isNil(modal)) {
            const modalInput = modal.querySelector("input, button");
            if (!isNil(modalInput)) {
                modalInput.focus();
            }
        }
    };

    /**
     * Determines whether the value is a nil-value. A nil value is an undefined or a null.
     */
    const isNil = function (value) {
        return (undefined === value) || (null === value);
    };

    /**
     * Local save callback function. Creates a new anchor that targets the blob, then activates the
     * link. The blob to target is the input argument.
     */
    const LOCAL_SAVE_CALLBACK = getArgument(arguments, 2, function (blob) {
        const a = new FunctionalElement("a")
            .style("display", "none")
            .set("target", "_blank")
            .set("href", window.URL.createObjectURL(blob))
            .set("download", "recording." + saveFormat())
            .attach(mainUI);
        a.element().click();
        a.detach();
    });

    /**
     * Toggles the resource to either online mode (true) or offline mode (false).
     */
    const onlineResource = function (/* online = true */) {
        const online = getArgument(arguments, 0, true);
        resourceOnline.class("selected", online);
        resourceOffline.class("selected", !online);
        loadFile
            .class("online", online)
            .class("offline", !online)
            .set("type", online ? "url" : "file")
            .element().value = null;
        changeLoadLabel();

        state.online = online;

        if (!(state.playing || state.recording)) {
            idleControls();
        }
    };

    const SAVE_CALLBACK = getArgument(arguments, 1, function (request) {
        state.bindKeys = false;
        const input = new FunctionalElement("input");
        const modalContents = new FunctionalElement("div")
            .append(new FunctionalElement("div")
                .set("innerHTML", "Link to saved audio clip: ")
            ).append(input
                .style("display", "block")
                .style("font-family", "inherit")
                .style("margin", "10px auto")
                .style("width", "200px")
                .set("value", request.response)
                .listen("keydown", function (event) {
                    if ("Enter" === event.code || "NumpadEnter" === event.code) {
                        modal.close();
                    }
                })
            ).append(new FunctionalElement("button")
                .style("display", "block")
                .style("font-family", "inherit")
                .style("font-size", "inherit")
                .style("margin", "auto")
                .style("padding", "5px")
                .style("width", "100px")
                .set("innerHTML", "OK")
                .listen("click", function (event) {
                    modal.close();
                })
            );
        const closeModal = function (label) {
            state.tags[parseFloat(time)] = (0 < label.length ? label : time + "s");
            state.tagsSynced = false;
            modal.close();
        };
        const modal = createModal(modalContents);
        modal.launch();
        input.element().select();
    });

    /**
     * Returns the currently-selected save format.
     */
    const saveFormat = function () {
        const index = saveOptions.element().selectedIndex;
        const format = saveOptions.element().options[index].value;
        return format;
    };

    /**
     * The URl to save at. Defaults to null, which disables online saving.
     */
    const SAVE_URL = getArgument(arguments, 0, null);

    /**
     * Constant for allowed slack between two times to still consider them to be equal. Used to
     * mitigate small time differences due to runtimes.
     *
     * Given in seconds.
     */
    const TIME_EPSILON = 1e-10;

    /**
     * Determines whether the two given times are approximately equal -- that is, within
     * TIME_EPSILON of each other.
     */
    const timeEqualsA = function (time1, time2) {
        return Math.abs(time1 - time2) <= TIME_EPSILON;
    };

    /**
     * Toggles the button into the enabled/disabled state.
     */
    const toggleInput = function (button /* , enable = true */) {
        const enable = getArgument(arguments, 1, true);
        if (enable) {
            button.set("disabled", null).style("color", "#000");
        } else {
            button.set("disabled", true).style("color", "#888");
        }
    };

    /**
     * The amount of extra space on the left and right ends of the visualizer to allow for better
     * drag-and-drop behavior, in pixels. Must correspond to the same constant in the stylesheets.
     */
    const VISUALIZER_BUFFER = 50;

    /**
     * The minimum zoom level.
     */
    const ZOOM_MIN = 0;

    /**
     * The maximum zoom level.
     */
    const ZOOM_MAX = 16;

    /**
     * Retrieves the zoom factor.
     */
    const zoomFactor = function () {
        return Math.pow(1.2, state.zoom);
    };

    /**
     * Updates the display to indicate the zoom level.
     */
    const zoomUpdate = function () {
        // Use regex to parse the zoom level into the format that we want to show.
        const matches = (100.0 * zoomFactor()).toString().match(/^\d{2}\d*|^(0|\.)*([.0-9]{3})/);
        var zoom = matches[0];

        // Remove trailing decimal points.
        if ("." === zoom.substring(zoom.length - 1)) {
            zoom = zoom.substring(0, zoom.length - 1);
        }

        zoomDisplay.set("innerHTML", "Zoom: " + zoom + "%");

        // Deal with when scrolling is now past the max allowed scroll.
        const maxScroll = audioVisualizer.element().clientWidth - audioUI.element().clientWidth;
        const currentScroll = audioUI.element().scrollLeft;
        audioUI.element().scrollLeft = Math.max(0, Math.min(maxScroll, currentScroll));

        // Update button visuals.
        toggleInput(buttonZoomIn, state.zoom < ZOOM_MAX);
        toggleInput(buttonZoomOut, state.zoom > ZOOM_MIN);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Helper class FunctionalElement for functional language-style HTML DOM manipulations.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * A functional, stripped-down wrapper around HTML DOM elements. Also allows bundling elements
     * together so that operations work on them collectively.
     *
     * Invariant: the encapsulated elements can never be undefined or null, and the array must have
     * at least 1 element. All of the elements must have the same attributes and styles.
     *
     * Functions:
     *     resize(max_size) -- attempts to resize by creating shallow copies of the first element
     *         and appending them to the first element's parent, if it exists. If max_size is less
     *         than count(), truncates to the first max_size elements. If equals, does nothing.
     *     count() -- returns the number of elements that have been bundled together in this
     *         FunctionalElement instance.
     *     element(index = 0) -- accessor for the encapsulated elements. Defaults to just the first
     *         element, which is also the only element for single-element cases.
     *     get(attribute) -- wrapper for getAttribute(attribute).
     *     set(attribute, value) -- wrapper for setAttribute(attribute, value) and
     *         removeAttribute(attribute). The latter is called if the value is undefined or null,
     *         otherwise the former is called. For the innerHTML attribute, will treat undefined
     *         and null as empty strings.
     *     class(classname, add) -- forcibly add or remove the class from the element(s).
     *     style(property, value) -- wrapper for style.setProperty(property, value).
     *     append(child, index = 0) -- wrapper for appendChild(child). Will append all the children
     *         to the specified element at the given index. Defaults to appending all the children
     *         to the first element.
     *     remove(child) -- wrapper for removeChild(child).
     *     attach(parent, index = 0) -- appends the element(s) to the specified parent at the given
     *         element index, which defaults to the first element.
     *     detach() -- removes the element(s) as children of their parent.
     *     listen(event, callback) -- wrapper for addEventListener(event, callback).
     *
     * @constructor
     */
    const FunctionalElement = function (tagname /* , count = 1 */) {
        const count = getArgument(arguments, 1, 1);
        const elements = [];
        for (var i = 0; i < count; i++) {
            elements.push(document.createElement(tagname));
        }
        this.resize = function (max_size) {
            while (max_size > this.count()) {
                const element = elements[0].cloneNode();
                if (!isNil(elements[0].parentNode)) {
                    elements[0].parentNode.appendChild(element);
                }
                elements.push(element);
            }
            while (max_size < this.count()) {
                const element = elements[max_size];
                if (!isNil(element.parentNode)) {
                    element.parentNode.removeChild(element);
                }
                elements.splice(max_size, 1);
            }
            return this;
        };
        this.count = function () {
            return elements.length;
        };
        this.element = function (/* index = 0 */) {
            const index = getArgument(arguments, 0, 0);
            return elements[index];
        };
        this.get = function (attribute) {
            // Assuming that the default element is representative of all the elements.
            return this.element().getAttribute(attribute);
        };
        this.set = function (attribute, value) {
            for (var item of elements) {
                const element = item;
                if ("innerHTML" === attribute) {
                    element.innerHTML = (isNil(value) ? "" : value);
                } else {
                    if (isNil(value)) {
                        element.removeAttribute(attribute);
                    } else {
                        element.setAttribute(attribute, value);
                    }
                }
            }
            return this;
        };
        this.class = function (classname /* , add = true */) {
            const add = getArgument(arguments, 1, true);
            for (var item of elements) {
                const element = item;
                element.classList.toggle(classname, add);
            }
            return this;
        };
        this.style = function (property, value) {
            for (var item of elements) {
                const element = item;
                element.style.setProperty(property, value);
            }
            return this;
        };
        this.append = function (child /*, index = 0 */) {
            const index = getArgument(arguments, 1, 0);
            for (var i = 0; i < child.count(); i++) {
                this.element(index).appendChild(child.element(i));
            }
            return this;
        };
        this.remove = function (child) {
            for (var item of elements) {
                const element = item;
                element.removechild(child.element());
            }
            return this;
        };
        this.attach = function (parent /* , index = 0 */) {
            const index = getArgument(arguments, 1, 0);
            if (!isNil(parent)) {
                for (var item of elements) {
                    const element = item;
                    parent.element(index).appendChild(element);
                }
            }
            return this;
        };
        this.detach = function () {
            for (var item of elements) {
                const element = item;
                isNil(element.parentNode) || element.parentNode.removeChild(element);
            }
            return this;
        };
        this.listen = function (event, callback) {
            for (var item of elements) {
                const element = item;
                element.addEventListener(event, callback);
            }
            return this;
        };
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Create the DOM elements we want to work with.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Highest-level container for the interface, also responsible for the faded screen background.
    const container = new FunctionalElement("div");

    // Container for the main UI.
    const mainUI = new FunctionalElement("div");

    // Title bar for the UI.
    const titleBar = new FunctionalElement("div");
    const title = new FunctionalElement("div");
    const titleClose = new FunctionalElement("div");

    // Container for the controls UI.
    const controlsUI = new FunctionalElement("div");

    // Buttons for controlling recording and playback.
    const buttonRecord = new FunctionalElement("button");
    const buttonPlay = new FunctionalElement("button");
    const buttonStop = new FunctionalElement("button");

    // Container for the zoom UI.
    const zoomUI = new FunctionalElement("div");

    // Buttons for zooming.
    const buttonZoomIn = new FunctionalElement("button");
    const buttonZoomOut = new FunctionalElement("button");
    const buttonZoomReset = new FunctionalElement("button");

    // Display for the zoom value for the zoom UI.
    const zoomDisplay = new FunctionalElement("div");

    // Container for the audio UI.
    const audioUI = new FunctionalElement("div");

    // Container for the audio display.
    const audioDisplayContainer = new FunctionalElement("div");

    // Display for the visualizer of the audio.
    const audioDisplay = new FunctionalElement("canvas");

    // Base layer for the visualizer, on top of the canvas. Necessary for proper drag-and-drop
    // behavior using the ticker.
    const audioVisualizer = new FunctionalElement("div");

    // Red bar for indicating the current time frame on the display.
    const audioTicker = new FunctionalElement("div");

    // The ticker's label.
    const audioTickerLabel = new FunctionalElement("div");

    // Start trimming box, label, and visual element.
    const audioStartTrimmer = new FunctionalElement("div");
    const audioStartTrimmerLabel = new FunctionalElement("div");
    const audioStartTrimmerVisual = new FunctionalElement("canvas");

    // End trimming box, label, and visual element.
    const audioEndTrimmer = new FunctionalElement("div");
    const audioEndTrimmerLabel = new FunctionalElement("div");
    const audioEndTrimmerVisual = new FunctionalElement("canvas");

    // Tag UI. For checkpointing via tagging times using the ticker.
    const tagUI = new FunctionalElement("div");
    const buttonTag = new FunctionalElement("button");
    const tagList = new FunctionalElement("div");

    // Container for the load UI.
    const loadUI = new FunctionalElement("div");

    // File-loading input.
    const loadFile = new FunctionalElement("input");
    const loadFileLabel = new FunctionalElement("div");

    // Load button.
    const buttonLoad = new FunctionalElement("button");

    // Resource UI: online/offline toggle.
    const resourceUI = new FunctionalElement("div");
    const resourceOnline = new FunctionalElement("div");
    const resourceOffline = new FunctionalElement("div");

    // Container for the save UI.
    const saveUI = new FunctionalElement("div");

    // Saving file format options.
    const saveOptions = new FunctionalElement("select");
    const saveOptionsLabel = new FunctionalElement("div");
    const saveOptionWAV = new FunctionalElement("option");
    const saveOptionWEBM = new FunctionalElement("option");

    // Save button.
    const buttonSave = new FunctionalElement("button");

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Hook up click listeners.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Prevent events from propagating to elements underneath the AuO instance.
    container.listen("click", function (event) {
        event.stopPropagation();
    });

    // Closing via crosshairs is equivalent to suspending the instance.
    titleClose.listen("click", function (event) {
        suspendInstance();
    });

    // Clicking the record button.
    function onRecordClicked(event) {
        container.element().focus();

        stateReset();
        zoomUpdate();
        state.recording = true;

        editorMode(false);
        toggleInput(buttonLoad, false);
        toggleInput(buttonPlay, false);
        toggleInput(buttonStop);
        toggleInput(buttonSave, false);
        tagUI.class("idle", false);
        toggleInput(buttonRecord, false);

        state.audioPlaybackCurrentTime = function () {
            return state.elapsedTime;
        };
    }
    buttonRecord.listen("click", onRecordClicked);

    // Clicking the play button.
    buttonPlay.listen("click", function (event) {
        container.element().focus();

        state.playing = true;

        editorMode(false);
        toggleInput(buttonLoad, false);
        toggleInput(buttonRecord, false);
        toggleInput(buttonSave, false);
        toggleInput(buttonStop);
        tagUI.class("idle", false);
        toggleInput(buttonPlay, false);

        const currentTime = Math.max(state.trimStart, state.audioPlaybackCurrentTime());
        const endTime = state.elapsedTime - state.trimEnd;
        const startTime = (currentTime > endTime || timeEqualsA(currentTime, endTime) ?
            state.trimStart : currentTime);
        beginAudioPlayback(startTime, endTime);
    });

    // Clicking the stop button.
    function onStopClicked(event) {
        container.element().focus();

        if (state.playing) {
            state.audioPlaybackSource.stop();
            if (!isNil(state.audioPlaybackSource)) {
                delete state.audioPlaybackSource;
            }
            state.audioPlaybackSource = null;

            const playbackStopTime = state.audioPlaybackCurrentTime();
            state.audioPlaybackCurrentTime = function () {
                return playbackStopTime;
            };

            state.playing = false;

            editorMode(true);
            idleControls();
        } else if (state.recording) {
            buttonStop.set("innerHTML", "Processing...");
            toggleInput(buttonStop, false);
            state.endRecording = true;
        }
    }
    buttonStop.listen("click", onStopClicked);

    // Clicking the zoom in button.
    buttonZoomIn.listen("click", function (event) {
        state.zoom = Math.min(ZOOM_MAX, state.zoom + 1);
        zoomUpdate();
        animateAudioDisplayByForce();
    });

    // Clicking the zoom out button.
    buttonZoomOut.listen("click", function (event) {
        state.zoom = Math.max(ZOOM_MIN, state.zoom - 1);
        zoomUpdate();
        animateAudioDisplayByForce();
    });

    // Clicking the zoom reset button.
    buttonZoomReset.listen("click", function (event) {
        state.zoom = 0;
        zoomUpdate();
        animateAudioDisplayByForce();
    });

    // Clicking the tag current ticker location button.
    buttonTag.listen("click", function (event) {
        const time = Math.max(state.trimStart, Math.min(state.elapsedTime - state.trimEnd,
            state.audioPlaybackCurrentTime())).toFixed(3);
        const labelInput = new FunctionalElement("input");
        const labelButton = new FunctionalElement("button");
        const modalContents = new FunctionalElement("div")
            .append(new FunctionalElement("div")
                .set("innerHTML",
                    "Please enter a label for the tag at " + time +
                    "s. Leave the field blank to use the time as the label.")
            ).append(labelInput
                .style("display", "block")
                .style("font-family", "inherit")
                .style("font-size", "1.2em")
                .style("margin", "10px auto")
                .set("value", time + "s")
                .listen("keydown", function (event) {
                    if ("Enter" === event.code || "NumpadEnter" === event.code) {
                        labelButton.element().click();
                    }
                })
            ).append(labelButton
                .style("display", "block")
                .style("font-family", "inherit")
                .style("font-size", "inherit")
                .style("margin", "auto")
                .style("padding", "5px")
                .style("width", "100px")
                .set("innerHTML", "OK")
                .listen("click", function (event) {
                    closeModal(this.previousSibling.value);
                })
            )
            .listen("keydown", function (event) {
                if ("Escape" === event.code) {
                    closeModal("");
                }
            });
        const closeModal = function (label) {
            state.tags[parseFloat(time)] = (0 < label.length ? label : time + "s");
            state.tagsSynced = false;
            modal.close();
        };
        const modal = createModal(modalContents);
        modal.launch();
        labelInput.element().select();
    });

    // Clicking the label for file loading.
    loadFileLabel.listen("click", function (event) {
        loadFile.element().click();
    });

    // Clicking the load button.
    buttonLoad.listen("click", function (event) {
        container.element().focus();

        // UI change to let user know that load is being processed.
        buttonLoad.set("innerHTML", "Processing...");
        editorMode(false);
        toggleInput(buttonLoad, false);
        toggleInput(buttonPlay, false);
        toggleInput(buttonRecord, false);
        toggleInput(buttonSave, false);
        toggleInput(saveOptions, false);
        tagUI.class("idle", false);

        beginAudioLoad(state.online ? [loadFile.element().value] : loadFile.element().files);
    });

    // Clicking the online resource label.
    resourceOnline.listen("click", function (event) {
        onlineResource();
    });

    // Clicking the offline resource label.
    resourceOffline.listen("click", function (event) {
        onlineResource(false);
    });

    // Clicking the save button.
    function onSaveClicked(event) {
        container.element().focus();

        // UI change to let user know that save is being processed.
        buttonSave.set("innerHTML", "Processing...");
        editorMode(false);
        toggleInput(buttonSave, false);
        toggleInput(buttonLoad, false);
        toggleInput(buttonPlay, false);
        toggleInput(buttonRecord, false);
        toggleInput(saveOptions, false);
        tagUI.class("idle", false);

        const endTime = state.elapsedTime - state.trimEnd;
        const startTime = state.trimStart;

        beginAudioSave(function (blob) {
            if (!state.online || isNil(SAVE_URL)) {
                editorMode(true);
                idleControls();

                // If no save URL is provided, or we're in offline mode, run the save callback
                // function on the blob. The online part is mostly to deal with hacking the HTML to
                // force the save button to be enabled when online saving is not available.
                LOCAL_SAVE_CALLBACK(blob);
            } else {
                // If a save URL is provided, send an XHR to the target URL with the blob.
                const request = new XMLHttpRequest();
                request.open("POST", SAVE_URL, true);
                request.onload = function() {
                    // Change UI back to let use know that save is complete.
                    editorMode(true);
                    idleControls();

                    // [200, 300) are "okay" statuses.
                    if (this.status >= 200 && this.status < 300) {
                        SAVE_CALLBACK(request);
                    } else {
                        alert("Save failed. Error occurred while saving.");
                    }
                };
                request.onerror = function () {
                    idleControls();
                    alert("Save failed. Error occurred while saving.");
                };
                request.send(blob);
            }
        }, startTime, endTime);
    }
    buttonSave.listen("click", onSaveClicked);

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Hook up drag listeners.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Begin dragging the end trimming box.
    audioEndTrimmer.listen("dragstart", function (event) {
        event.dataTransfer.setData("text", "audioStartTrimmer");
        event.dataTransfer.effectAllowed = "move";

        // Remember the x coordinate where the drag started. This is aligned with the start of the
        // visualizer.
        const xRef = event.offsetX + parseInt(audioEndTrimmer.element().offsetLeft);

        // Remember the time to offset from.
        const timeRef = state.trimEnd;

        state.audioOnDrag = function (x) {
            const canvasWidth = audioDisplay.get("width");
            const time = timeRef + convertUnits(xRef - x, canvasWidth, state.elapsedTime);
            state.trimEnd = Math.max(0, Math.min(state.elapsedTime - state.trimStart, time));
            animateAudioTrimmers();
        };

        state.audioOnDrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
            animateAudioTrimmers();
        };

        // Remove ghost image when dragging.
        const emptyDragImage = new FunctionalElement("canvas");
        emptyDragImage.set("height", "0px").set("width", "0px");
        event.dataTransfer.setDragImage(emptyDragImage.element(), 0, 0);
    });

    // Begin dragging the start trimming box.
    audioStartTrimmer.listen("dragstart", function (event) {
        event.dataTransfer.setData("text", "audioStartTrimmer");
        event.dataTransfer.effectAllowed = "move";

        // Remember the x coordinate where the drag started. This is aligned with the start of the
        // visualizer.
        const xRef = event.offsetX;

        // Remember the time to offset from.
        const timeRef = state.trimStart;

        state.audioOnDrag = function (x) {
            const canvasWidth = audioDisplay.get("width");
            const time = timeRef + convertUnits(x - xRef, canvasWidth, state.elapsedTime);
            state.trimStart = Math.max(0, Math.min(state.elapsedTime - state.trimEnd, time));
            animateAudioTrimmers();
        };

        state.audioOnDrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
            animateAudioTrimmers();
        };

        // Remove ghost image when dragging.
        const emptyDragImage = new FunctionalElement("canvas");
        emptyDragImage.set("height", "0px").set("width", "0px");
        event.dataTransfer.setDragImage(emptyDragImage.element(), 0, 0);
    });

    // Begin dragging the ticker.
    audioTicker.listen("dragstart", function (event) {
        event.dataTransfer.setData("text", "audioTicker");
        event.dataTransfer.effectAllowed = "move";

        state.audioOnDrag = function (x) {
            const canvasWidth = audioDisplay.get("width");
            const tickerWidth = audioTicker.element().offsetWidth;
            x = Math.max(0, Math.min(canvasWidth, x - 50));
            state.audioPlaybackCurrentTime = function () {
                return convertUnits(x, canvasWidth, state.elapsedTime);
            };
            animateAudioTicker();
        };

        state.audioOnDrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
            animateAudioTicker();
        };

        // Remove ghost image when dragging.
        const emptyDragImage = new FunctionalElement("canvas");
        emptyDragImage.set("height", "0px").set("width", "0px");
        event.dataTransfer.setDragImage(emptyDragImage.element(), 0, 0);
    });

    // Begin dragging the visualizer itself.
    audioVisualizer.listen("dragstart", function (event) {
        event.dataTransfer.setData("text", "audioStartTrimmer");
        event.dataTransfer.effectAllowed = "move";

        // Remember the x coordinate where the drag started. This is aligned with the start of the
        // visualizer.
        const xRef = event.offsetX;

        state.audioOnDrag = function (x) {
            const scrollRef = audioUI.element().scrollLeft;
            const scroll = scrollRef - (x - xRef);  // Invert to implement drag-panning.
            const maxScroll = audioVisualizer.element().clientWidth - audioUI.element().clientWidth;
            audioUI.element().scrollLeft = Math.max(0, Math.min(maxScroll, scroll));
        };

        state.audioOnDrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };

        // Remove ghost image when dragging.
        const emptyDragImage = new FunctionalElement("canvas");
        emptyDragImage.set("height", "0px").set("width", "0px");
        event.dataTransfer.setDragImage(emptyDragImage.element(), 0, 0);
    });

    // Function for muting dragover events.
    const audioMuteDragoverHandler = function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEvent = "move";
    };

    // Function for handling drop events.
    const audioDropHandler = function (event) {
        event.stopPropagation();

        state.audioOnDrop(event);

        // Reset the drag and drop callbacks.
        state.audioOnDrag = function () {};
        state.audioOnDrop = function () {};
    };

    audioEndTrimmer.listen("dragover", function (event) {
        state.audioOnDrag(event.offsetX + parseInt(audioEndTrimmer.element().offsetLeft));
    });

    audioEndTrimmerVisual.listen("dragover", function (event) {
        state.audioOnDrag(event.offsetX + parseInt(audioEndTrimmerVisual.element().offsetLeft) +
            parseInt(audioEndTrimmer.element().offsetLeft));
    });

    audioStartTrimmer.listen("dragover", function (event) {
        state.audioOnDrag(event.offsetX);
    });

    audioStartTrimmerVisual.listen("dragover", function (event) {
        state.audioOnDrag(event.offsetX + parseInt(audioStartTrimmerVisual.element().offsetLeft));
    });

    audioTicker.listen("dragover", function (event) {
        state.audioOnDrag(event.offsetX + parseInt(audioTicker.element().offsetLeft));
    });

    audioVisualizer.listen("dragover", function (event) {
        state.audioOnDrag(event.offsetX);
    });

    // Attach drop handlers.
    const addAudioDropHandlers = function () {
        (function addAudioDropHandler (element) {
            element.addEventListener("drop", audioDropHandler);
            element.addEventListener("dragover", audioMuteDragoverHandler);
            for (var i = 0; i < element.childNodes.length; i++) {
                addAudioDropHandler(element.childNodes[i]);
            }
        })(container.element());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Hook up other listeners.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Hotkey functionality.
    container.listen("keydown", hotkeyHandler);

    // Completing a file selection.
    loadFile.listen("change", loadFileHandler);

    // Typing a file URL.
    loadFile.listen("keydown", loadFileHandler);
    loadFile.listen("keyup", loadFileHandler);

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Build the DOM tree.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    container
        .append(new FunctionalElement("div").class("middle-container")
            .append(new FunctionalElement("div").class("center-container")
                .append(mainUI
                    .append(titleBar
                        .append(title)
                        .append(titleClose)
                    ).append(controlsUI
                        .append(buttonRecord)
                        .append(buttonPlay)
                        .append(buttonStop)
                    ).append(zoomUI
                        .append(zoomDisplay)
                        .append(buttonZoomIn)
                        .append(buttonZoomOut)
                        .append(buttonZoomReset)
                    ).append(audioUI
                        .append(audioDisplayContainer
                            .append(audioDisplay)
                        )
                        .append(audioVisualizer)
                        .append(audioEndTrimmer
                            .append(audioEndTrimmerVisual)
                            .append(audioEndTrimmerLabel)
                        )
                        .append(audioStartTrimmer
                            .append(audioStartTrimmerVisual)
                            .append(audioStartTrimmerLabel)
                        )
                        .append(audioTicker
                            .append(audioTickerLabel)
                        )
                    ).append(tagUI
                        .append(buttonTag)
                        .append(tagList)
                    ).append(loadUI
                        .append(loadFile)
                        .append(loadFileLabel)
                        .append(buttonLoad)
                    ).append(resourceUI
                        .append(resourceOnline)
                        .append(resourceOffline)
                    ).append(saveUI
                        .append(saveOptionsLabel)
                        .append(saveOptions)
                        .append(buttonSave)
                    )
                )
            )
        )
    ;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Style the DOM elements. Styles are sorted lexically. Styles come before classes before sets.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // This namespace must match the one in the anonymous function for creating AuO styles below.
    const css_namespace = "AuO";

    container.class(css_namespace).set("tabIndex", "0");

    mainUI.class("auo-main-ui");

    titleBar.class("auo-title-bar");
    title.class("auo-title").set("innerHTML", "AuO: Online Audio Recorder and Editor");
    titleClose.class("auo-title-close").set("innerHTML", "[Close] &times;");

    controlsUI.class("auo-controls-ui");
    buttonRecord.class("auo-controls-record-button").set("title", "Hotkey: [R]");
    buttonPlay.class("auo-controls-play-button").set("title", "Hotkey (toggle): [Space]");
    buttonStop.class("auo-controls-stop-button").set("title", "Hotkey (toggle): [Space]");

    audioUI.class("auo-audio-ui");
    audioDisplayContainer.class("auo-audio-display-container");
    audioDisplay.class("auo-audio-display");

    audioVisualizer.class("auo-audio-visualizer").set("draggable", true);
    audioTicker.class("auo-audio-ticker")
        .set("title", "Left/right arrowkeys to reposition. Hold SHIFT for larger intervals.");
    audioTickerLabel.class("auo-audio-ticker-label");
    audioStartTrimmer.class("auo-audio-start-trimmer").set("title", "[ to increase trim, { to decrease trim");
    audioStartTrimmerLabel.class("auo-audio-start-trimmer-label");
    audioEndTrimmer.class("auo-audio-end-trimmer").set("title", "] to increase trim, { to decrease trim");
    audioEndTrimmerLabel.class("auo-audio-end-trimmer-label");

    zoomUI.class("auo-zoom-ui");
    buttonZoomIn.class("auo-zoom-in-button").set("innerHTML", "Zoom in")
        .set("title", "Hotkey: [+]");
    buttonZoomOut.class("auo-zoom-out-button").set("innerHTML", "Zoom out")
        .set("title", "Hotkey: [-]");
    buttonZoomReset.class("auo-zoom-reset-button").set("innerHTML", "Zoom reset")
        .set("title", "Hotkey: [0]");
    zoomDisplay.class("auo-zoom-display");

    tagUI.class("auo-tag-ui");
    buttonTag.class("auo-tag-button").set("innerHTML", "Tag current<br />ticker location")
        .set("title", "Hotkey: [T]");
    tagList.class("auo-tag-list");

    loadUI.class("auo-load-ui").class("middle-container");
    loadFileLabel.class("auo-load-file-label").set("title", "Hotkey: [L]");
    loadFile.class("auo-load-file").set("accept", getSupportedMediaTypes().join(","))
        .set("placeholder", "Enter URL here").set("title", "Hotkey: [L]");
    buttonLoad.class("auo-load-button");

    resourceUI.class("auo-resource-ui");
    resourceOnline.class("auo-resource-online").set("innerHTML", "Online")
        .set("title", "Hotkey (toggle): [O]");
    resourceOffline.class("auo-resource-offline").set("innerHTML", "Offline")
        .set("title", "Hotkey (toggle): [O]");

    saveUI.class("auo-save-ui").class("middle-container");
    saveOptionsLabel.class("auo-save-options-label").set("innerHTML", "Save file format:");
    saveOptions.class("auo-save-options");
    saveOptionWAV.set("innerHTML", "WAV").set("value", "wav").attach(saveOptions);
    if ("Chrome" !== browserName() || 50 <= browserVersionMajor()) {
        saveOptionWEBM.set("innerHTML", "WebM").set("value", "webm").attach(saveOptions);
    }
    buttonSave.class("auo-save-button").set("title", "Hotkey: [S]");

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Complete runtime evaluations at the end of construction.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    runtimeAtConstruction();
};

/**
 * Anonymous function for generating and adding the AuO CSS style sheet.
 */
export function injectSheet() {
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Create a Sheet interface for working with CSSStyleSheets.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates a new style sheet and namespace. Sheet uses this namespace for constructing rules.
     * Rules will be automatically prepended with ".namespace " with the noticeable space.
     *
     * rule(rule, media) -- creates a new rule ".namespace rule" under the provided media. By
     *     default, media is null, which indicates to not use @media.
     */
    const Sheet = new (function() {
        // This namespace must match the one in the constructor of AuO instances above.
        const namespace = "AuO";

        // HTML style element used for generating the CSSStyleSheet object.
        const element = document.createElement("style");

        // Makes the style visible so that we can retrieve the CSSStyleSheet object from the document.
        document.head.appendChild(element);

        // Retrieves the corresponding CSSStyleSheet object.
        const sheet = element.sheet;

        this.rule = function (rule /* , media = null */) {
            const media = 1 < arguments.length ? arguments[1] : null;
            rule = "." + namespace + " " + rule.replace(/[\s]+/g, " ");
            if (undefined !== media && null !== media) {
                rule = "@media " + media + " { " + rule + " }";
            }
            sheet.insertRule(rule, sheet.cssRules.length);
        };
    })();

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Some constants for the styles.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * The amount of extra space on the left and right ends of the visualizer to allow for better
     * drag-and-drop behavior, in pixels. Must correspond to the same constant in the AuO instances.
     */
    const VISUALIZER_BUFFER = 50;

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // General styling classes. Sorted lexically.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    Sheet.rule(`.center-container {
        text-align: center;
        width: 100%;
    }`);

    Sheet.rule(`.middle-container {
        display: block;
        height: 100%;
        white-space: nowrap;
    }`);

    Sheet.rule(`.middle-container:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        width: 0px;
    }`);

    Sheet.rule(`.middle-container > * {
        display: inline-block;
        vertical-align: middle;
    }`);

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Styling specific to AuO elements. Sorted in order of creation in AuO.
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // Rule matching the container, which by default has the namespace as its class.
    Sheet.rule(`{
        background-color: rgba(0, 0, 0, 0.4);
        display: block;
        height: 100vh;
        left: 0px;
        overflow: auto;
        position: fixed;
        text-align: center;
        top: 0px;
        width: 100vw;
    }`);

    Sheet.rule(`button {
        font-family: inherit;
        font-size: 8pt;
    }`);

    Sheet.rule(`.auo-main-ui {
        background-color: #FFF;
        border-radius: 10px;
        box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.4);
        box-sizing: border-box;
        display: block;
        margin: auto;
        overflow: auto;
        padding: 25px;
        position: relative;
        text-align: justify;
    }`);

    Sheet.rule(`.auo-main-ui {
        white-space: nowrap;
        width: 80vw;
    }`, `(min-width: 640px)`);

    Sheet.rule(`.auo-main-ui {
        white-space: normal;
        width: 100%;
    }`, `(max-width: 640px)`);

    Sheet.rule(`.auo-title-bar {
        background-color: #DDD;
        display: block;
        font-size: 12pt;
        font-weight: bold;
        margin: -25px -25px 0px -25px;
        padding: 10px;
        white-space: nowrap;
        width: auto;
    }`);

    Sheet.rule(`.auo-title {
        display: inline-block;
        text-align: left;
        width: calc(100% - 120pt);
    }`);

    Sheet.rule(`.auo-title {
        font-size: 14pt;
    }`, `(min-width: 640px)`);

    Sheet.rule(`.auo-title {
        font-size: 10pt;
    }`, `(max-width: 640px)`);

    Sheet.rule(`.auo-title-close {
        display: inline-block;
        font-size: 10pt;
        text-align: right;
        width: 120pt;
    }`);

    Sheet.rule(`.auo-controls-ui {
        box-sizing: border-box;
        display: inline-block;
        padding: 2.5px;
        text-align: left;
        vertical-align: top;
        white-space: normal;
    }`);

    Sheet.rule(`.auo-controls-ui {
        width: 45%;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-controls-ui {
        width: 50%;
    }`, `(max-width: 1280px) and (min-width: 640px)`);

    Sheet.rule(`.auo-controls-ui {
        width: 100%;
    }`, `(max-width: 640px)`);

    Sheet.rule(`.auo-controls-ui > button {
        box-sizing: border-box;
        margin: 2.5px;
    }`);

    Sheet.rule(`.auo-controls-ui > button {
        width: 100px;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-controls-ui > button {
        width: 100%;
    }`, `(max-width: 1280px)`);

    Sheet.rule(`.auo-zoom-ui {
        box-sizing: border-box;
        display: inline-block;
        padding: 5px;
        text-align: right;
        white-space: normal;
    }`);

    Sheet.rule(`.auo-zoom-ui {
        width: 55%;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-zoom-ui {
        width: 50%;
    }`, `(max-width: 1280px) and (min-width: 640px)`);

    Sheet.rule(`.auo-zoom-ui {
        width: 100%;
    }`, `(max-width: 640px)`);

    Sheet.rule(`.auo-zoom-ui > button {
        box-sizing: border-box;
        margin: 2.5px;
    }`);

    Sheet.rule(`.auo-zoom-ui > button {
        width: 100px;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-zoom-ui > button {
        width: 100%;
    }`, `(max-width: 1280px)`);

    Sheet.rule(`.auo-zoom-display {
        text-align: center;
        display: inline-block;
    }`);

    Sheet.rule(`.auo-zoom-display {
        width: 200px;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-zoom-display {
        width: 100%;
    }`, `(max-width: 1280px)`);

    Sheet.rule(`.auo-audio-ui {
        display: block;
        margin: 5px;
        overflow-x: scroll;
        overflow-y: visible;
        position: relative;
        white-space: normal;
        width: auto;
    }`);

    Sheet.rule(`.auo-audio-display-container {
        border: 0px;
        display: block;
        margin: 0px;
        padding: 0px;
    }`);

    Sheet.rule(`.auo-audio-display {
        box-sizing: content-box;
        display: block;
        margin: 0px ` + VISUALIZER_BUFFER.toString() + `px;
        height: 100px;
        width: calc(100% - ` + (2 * VISUALIZER_BUFFER).toString() + `px);
    }`);

    Sheet.rule(`.auo-audio-display:not(:first-child) {
        border-top: 10px solid rgba(200, 200, 200, 0.25);
    }`);

    Sheet.rule(`.auo-audio-visualizer {
        border: 0px;
        height: 100%;
        left: 0px;
        margin: 0px;
        padding: 0px;
        position: absolute;
        pointer-events: auto;
        top: 0px;
        width: 100%;
    }`);

    Sheet.rule(`.auo-audio-ticker {
        background-color: #F00;
        border: 0px;
        display: block;
        height: 100%;
        left: 0px;
        position: absolute;
        top: 0px;
        width: 3px;
    }`);

    Sheet.rule(`.auo-audio-ticker:hover {
        border-color: #AAF;
        border-style: solid;
        border-width: 2px 4px;
        border-radius: 2px;
        height: calc(100% - 4px);
    }`);

    Sheet.rule(`.auo-audio-ticker > .auo-audio-ticker-label {
        background-color: #FFF;
        direction: inherit;
        display: none;
        font-size: 10pt;
        width: 0px;
    }`);

    Sheet.rule(`.auo-audio-ticker:hover > .auo-audio-ticker-label {
        display: block;
        margin-top: -2px;
    }`);

    Sheet.rule(`.auo-audio-start-trimmer {
        background-color: rgba(0, 100, 100, 0.25);
        border-right: 4px solid transparent;
        direction: rtl;
        display: block;
        height: 100%;
        left: 0px;
        padding: 0px;
        position: absolute;
        text-align: right;
        top: 0px;
        width: ` + (VISUALIZER_BUFFER - 4).toString() + `px;
    }`);

    Sheet.rule(`.auo-audio-start-trimmer:hover {
        border-right: 4px solid #AAF;
    }`);

    Sheet.rule(`.auo-audio-start-trimmer > .auo-audio-start-trimmer-label {
        background-color: #FFF;
        direction: inherit;
        display: none;
        font-size: 10pt;
        right: 0px;
        position: absolute;
        top: 0px;
        width: 0px;
    }`);

    Sheet.rule(`.auo-audio-start-trimmer:hover > .auo-audio-start-trimmer-label {
        display: block;
    }`);

    Sheet.rule(`.auo-audio-start-trimmer > canvas {
        display: block;
        height: 100%;
        width: 32px;
    }`);

    Sheet.rule(`.auo-audio-end-trimmer {
        background-color: rgba(0, 100, 100, 0.25);
        border-left: 4px solid transparent;
        direction: ltr;
        display: block;
        height: 100%;
        padding: 0px;
        position: absolute;
        right: 0px;
        text-align: left;
        top: 0px;
        width: ` + (VISUALIZER_BUFFER - 4).toString() + `px;
    }`);

    Sheet.rule(`.auo-audio-end-trimmer:hover {
        border-left: 4px solid #AAF;
    }`);

    Sheet.rule(`.auo-audio-end-trimmer > canvas {
        display: block;
        height: 100%;
        width: 32px;
    }`);

    Sheet.rule(`.auo-audio-end-trimmer > .auo-audio-end-trimmer-label {
        background-color: #FFF;
        direction: inherit;
        display: none;
        font-size: 10pt;
        left: 0px;
        position: absolute;
        top: 0px;
        width: 0px;
    }`);

    Sheet.rule(`.auo-audio-end-trimmer:hover > .auo-audio-end-trimmer-label {
        display: block;
    }`);

    Sheet.rule(`.auo-tag-ui {
        margin: 5px 0px;
    }`);

    Sheet.rule(`.auo-tag-ui > * {
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
    }`);

    Sheet.rule(`.auo-tag-button {
        width: 100px;
    }`);

    Sheet.rule(`.auo-tag-list {
        max-height: 100px;
        overflow: auto;
        padding: 0 5px;
        white-space: normal;
        width: calc(100% - 100px);
    }`);

    Sheet.rule(`.auo-tag-list > label {
        border: 1px solid black;
        border-radius: 25px;
        box-sizing: border-box;
        display: inline-block;
        font-size: 0.8em;
        margin: 1px;
        min-width: 50px;
        padding: 5px;
        text-align: center;
    }`);

    Sheet.rule(`.auo-tag-ui .auo-tag-list * {
        border-color: #888;
        color: #888;
    }`);

    Sheet.rule(`.auo-tag-ui.idle .auo-tag-list * {
        border-color: black;
        color: black;
    }`);

    Sheet.rule(`.auo-load-ui {
        display: inline-block;
        text-align: justify;
        width: 40%;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-load-ui {
        display: block;
        text-align: center;
        width: 100%;
    }`, `(max-width: 1280px)`);

    Sheet.rule(`.auo-load-ui > *:not(button) {
        border: 1px solid black;
        border-radius: 0.35em;
        box-sizing: border-box;
        font-family: inherit;
        font-size: 0.9em;
        max-height: 4em;
        max-width: 100%;
        padding: 0.25em;
    }`);

    Sheet.rule(`.auo-load-file-label {
        overflow: auto;
    }`);

    Sheet.rule(`.auo-load-file-label:hover {
        background-color: rgba(225, 225, 225, 0.5);
    }`);

    Sheet.rule(`.auo-load-file:invalid {
        background-color: rgba(255, 100, 100, 0.5);
        border-color: red;
    }`);

    Sheet.rule(`.auo-load-file.offline {
        display: none;
    }`);

    Sheet.rule(`.auo-load-file.online {
        display: inline-block;
    }`);

    Sheet.rule(`.auo-load-file.offline ~ .auo-load-file-label {
        display: inline-block;
    }`);

    Sheet.rule(`.auo-load-file.online ~ .auo-load-file-label {
        display: none;
    }`);

    Sheet.rule(`.auo-load-button {
        box-sizing: border-box;
        margin-left: 0.5em;
        width: 100px;
    }`);

    Sheet.rule(`.auo-resource-ui {
        display: inline-block;
        text-align: center;
        width: 20%;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-resource-ui {
        display: block;
        text-align: center;
        width: 100%;
    }`, `(max-width: 1280px)`);

    Sheet.rule(`.auo-resource-ui > div {
        border: 1px solid black;
        box-sizing: border-box;
        color: #888;
        display: inline-block;
        font-size: 10pt;
        font-variant: small-caps;
        padding: 2.5px;
        width: 75px;
    }`);

    Sheet.rule(`.auo-resource-ui > div.selected {
        background: green;
        color: white;
    }`);

    Sheet.rule(`.auo-resource-online {
        border-radius: 10px 0px 0px 10px;
    }`);

    Sheet.rule(`.auo-resource-offline {
        border-radius: 0px 10px 10px 0px;
    }`);

    Sheet.rule(`.auo-save-ui {
        display: inline-block;
        text-align: right;
        width: 40%;
    }`, `(min-width: 1280px)`);

    Sheet.rule(`.auo-save-ui {
        display: block;
        text-align: center;
        width: 100%;
    }`, `(max-width: 1280px)`);

    Sheet.rule(`.auo-save-options-label {
        display: inline-block;
    }`);

    Sheet.rule(`.auo-save-options {
        background: transparent;
        border: 0;
        box-sizing: border-box;
        font: inherit;
        margin: 0px 5px;
        width: 70px;
    }`);

    Sheet.rule(`.auo-save-button {
        box-sizing: border-box;
        width: 100px;
    }`);
}