import { Loader } from 'google-maps';

 function GMaps({grad}) {

    function getPropertyByName(obj, propName) {
        if (obj.hasOwnProperty(propName)) {
            return obj[propName];
        } else {
            return null;
        }
    }

    const koordinate={
        Karlovac: {lat:45.4929, lng:15.5553},
        Pula: {lat:44.8666, lng:13.8496},
        Rijeka: {lat:45.3271, lng:14.4422},
        Split: {lat:43.5147, lng:16.4435},
        Solin: {lat:43.5423, lng:16.4920},
        Trogir: {lat:43.5164, lng:16.2502},
        Vukovar: {lat:45.3452, lng:19.0010},
        Zagreb: {lat:45.8150, lng:15.9819}
    }
    const options = {
        apiKey: 'AIzaSyCT46aSAg3SdCICgrKAnW_3Ct-jsxLMcgg',
        region: 'HR'
    };

    const obj = getPropertyByName(koordinate, grad);
    console.log("GRAAADDDD:", obj)

    const loader = new Loader('AIzaSyCT46aSAg3SdCICgrKAnW_3Ct-jsxLMcgg', options);

    loader.load().then(function (google) {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: obj.lat, lng: obj.lng},
            zoom: 12,
        });
    });

    return(
        <div id="map" className="map" style={{ width: '100px', height: '100px' }}></div>
    );
}

export default GMaps;
