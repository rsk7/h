window = {
	AudioContext: function(){
		this.createOscillator = function(){
			return {
				connect: function(){},
				start: function(){},
				detune: {
					setValueAtTime: function(){},
					value: 0
				},
				frequency: {
					setValueAtTime: function(){},
					value: 0
				}
			};
		};
		this.createGain = function(){
			return {
				gain: {
					value: 0,
					cancelScheduledValues: function(){},
					setValueAtTime: function(){},
					linearRampToValueAtTime: function(){}
				},
				connect: function(){}
			};
		};
        this.createAnalyser = function() {
            return {
                connect: function(){}
            };
        };
	}
};
