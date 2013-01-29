

function LcarsOptions() {
    this.dims = {
        width: 1000,
        height: 500,
    };
    
    // NOTE the null values must be calculated during generation
    this.border = {
        padding: 5,
        title: "NCC-1701D",
        top: {
            x: null,
            y: null,
            width: null,
            height: 25,
            blockWidth: 250,
            blockVariance: 50
        },
        right: {
            x: null,
            y: null,
            width: 0,
            height: null,
            blockHeight: 100,
            blockVariance: 0
        },
        bottom: {
            x: null,
            y: null,
            width: null,
            height: 25,
            blockWidth: 250,
            blockVariance: 50
        },
        left: {
            x: null,
            y: null,
            width: 125,
            height: null,
            blockHeight: 100,
            blockVariance: 75
        }
    };
    
    this.colors = {
        background: '#000',
        text: '#9293D3',
        themes: [
            ['#FFAD00', '#FFC376', '#FFCEC0'],           // Yellows, Oranges
            ['#DD616C', '#FD827D', '#FFCEC0'],           // Pinks
            ['#6469A9', '#1A6AB3', '#B3C7FA', '#9C9CFE'] // Blues, Purples
        ]
    };
}
