  function transcribeAudio(audio) {
    const audio = '/Users/keving17/Documents/Github/TSL/teacher-moments/server/20180213-185953-485_8d44f67e-d783-4597-aec2-d417325cce06.wav';
    e.preventDefault();

    //hard coding submit button to transcribe audio
    fetch('/server/research/transcribe', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-audio': audio,
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email.toLowerCase()
      })
    })
      .then(result => {
        this.setState({ message: "transcribing!"});
      })
      .catch(err => {
        this.setState({ message: "rip"});
      });
  }