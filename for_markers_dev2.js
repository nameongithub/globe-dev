
import ico from "./icon.js";
import bg from './bg.js'

class Datapoint{
    constructor(lat, lng, info) {
        this.lat = lat;
        this.lng = lng;
        this.size = 30;
        this.color='red';
        this.info=info;
    }

    toElement() {
        const divElement = document.createElement('div');

        divElement.setAttribute('data-lat', this.lat);
        divElement.setAttribute('data-lng', this.lng);
        divElement.style.position = 'absolute';
        divElement.style.width = `${this.size}px`;
        divElement.style.height = `${this.size}px`;
        divElement.style.color=this.color
        divElement.style.pointerEvents='auto'


        const img = new Image();
        img.src = ico;
        img.style.display = 'block';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.cursor = 'pointer';


        divElement.innerHTML=markerSvg


        tippy(divElement, {
            animation: 'fade',
            allowHTML: true,
            theme: 'material',
            content: this.createDialogContent(),
            onHide () {
            },
            onShow (obj) {
                const el = obj.popper.querySelector('.tippy-content-body');
                setTimeout(() => {
                    const rect = el.getBoundingClientRect();
                    el.style.minHeight = ( 1526 * rect.width / 1438 ) + 'px'
                }, 100)
            }
        });

        return divElement
    }

    createDialogContent () {


        const str =  `<div style="background: url('${bg}') no-repeat; background-size: 100%;" class="tippy-content-body">
                    <div class="top"><img src="${this.info.image_path}" alt="" style="width: 100%; display: block; border-radius: 6px;"></div><ul>`
        let str2 = ''
        this.info.labelsAndTexts.forEach(item => {
            str2 += `<li><label>${item.label}</label><span>${item.text}</span></li>`
        })

        const str1 = `</ul></div>`
        return str + str2 + str1
    }

}


// Gen random data
export const datapoints = [
    new Datapoint(37.774, -122.419, {
        image_path: "./static/images/sanf.png",
        labelsAndTexts: [
            {label: 'City: ', text: 'San Francisco, CA'},
            {label: 'Country: ', text: 'United States'},
            {label: 'Location: ', text: '37.774°N, 122.419°W'},
            {label: 'Direction: ', text: 'Right-hand traffic'},
            {label: 'Scenario: ', text: 'Turn right on red'}
        ]
    }),
    new Datapoint(40.440, -79.995, {
        image_path: "./static/images/pitt.png",
        labelsAndTexts: [
            {label: 'City: ', text: 'Pittsburgh, PA'},
            {label: 'Country: ', text: 'United States'},
            {label: 'Location: ', text: '40.440°N, 79.995°W'},
            {label: 'Direction: ', text: 'Right-hand traffic'},
            {label: 'Scenario: ', text: 'Yield to a car doing &quot;Pittsburgh Left&quot;'}
        ]
    }),
    new Datapoint(51.507, -0.127, {
        image_path: "./static/images/lon.png",
        labelsAndTexts: [
            {label: 'City: ', text: 'London'},
            {label: 'Country: ', text: 'United Kingdom'},
            {label: 'Location: ', text: '51.507°N, 0.127°W'},
            {label: 'Direction: ', text: 'Left-hand traffic'},
            {label: 'Scenario: ', text: 'Drive on the left'}
        ]
    })
];


export const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="#660000" cx="14" cy="14" r="7"></circle>
    </svg>`;
