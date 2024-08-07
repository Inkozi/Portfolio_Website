

		const playerButtons = document.querySelectorAll('.player-button'),
		audio = document.querySelectorAll('audio'),
		playIcon = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
			<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
			</svg>
		`,
		pauseIcon = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
			<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
			</svg>
	`	;

		const timelines = document.querySelectorAll('.timeline');

		const soundButtons = document.querySelectorAll('.sound-button'),
		soundIcon = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
			<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
			</svg>`,
		muteIcon = `
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D3132">
			<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
		</svg>`;


		const  newButton = document.querySelector('.newButt');
		const  topButton = document.querySelector('.topButt');
		var previous = null;
		//Play Button Functions
		function toggleAudio(evt) {
			let index = evt.currentTarget.index;
			if (audio[index].paused) {
				//handle current index
				audio[index].play();
				playerButtons[index].innerHTML = pauseIcon;
				if (previous != null && previous != index){
					//handle previous
					audio[previous].pause()
					playerButtons[previous].innerHTML = playIcon;
				}
			} else {
				audio[index].pause();
				playerButtons[index].innerHTML = playIcon;
			}
			previous = index;
		}

		//Audio Function
		function audioEnded(params) {
			let idx = params.target.index;
			playerButtons[idx].innerHTML = playIcon;
			audio[idx].pause();
			playNext(idx);
		}

		//Automatically play the next song.
		function playNext(idx){
			if (idx < audio.length){
				idx = idx + 1;
				previous = idx;
				audio[idx].play();
				playerButtons[idx].innerHTML=pauseIcon;
			}
		}

		//Timeline Functions
		function changeTimelinePosition(params) {
			let idx = params.target.index;
			const percentagePosition = (100*audio[idx].currentTime) / audio[idx].duration;
			timelines[idx].style.backgroundSize = `${percentagePosition}% 100%`;
			timelines[idx].value = percentagePosition;
		}

		//Audio Function
		function changeSeek(evt) {
			let i = evt.currentTarget.index;
			const time = (timelines[i].value * audio[i].duration) / 100;
			audio[i].currentTime = time;
		}

		//Sound Button Functions
		function toggleSound(evt) {
			let i = evt.currentTarget.index;
			audio[i].muted = !audio[i].muted;
			soundButtons[i].innerHTML = audio[i].muted ? muteIcon : soundIcon;
		}

		//newButton
		function orderNew(evt){
			window.location.replace("https://diatomprojects.com/playlist/new")
		}

		//topButton
		function orderTop(evt){
			window.location.replace("https://diatomprojects.com/playlist/top")
		}

		//Setup event listeners.
		for (let i = 0; i < playerButtons.length; i++){
			playerButtons[i].index = i;
			playerButtons[i].addEventListener('click', toggleAudio);
			soundButtons[i].index = i;
			soundButtons[i].addEventListener('click', toggleSound);
			timelines[i].index = i;
			timelines[i].addEventListener('change', changeSeek);
			audio[i].index = i;
			audio[i].onended = audioEnded;
			audio[i].ontimeupdate = changeTimelinePosition;
		}
		newButton.addEventListener('click', orderNew);
		topButton.addEventListener('click', orderTop);
