var head = document.getElementsByTagName('HEAD').item(0);
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = 'css/button.css?time=20190626';
head.appendChild(style);
function TTbuttonToTrack() {
	var num,number,trackUrl;
	number=document.getElementById("TTtracknumber");
	num = number.value;
	num = num.replace(/\s+/g,"");
	if (num == "" || !/^[A-Za-z0-9-]{4,}$/.test(num)) {
		alert("Enter your tracking number.");
		return false;
	}
	trackUrl='//www.tracktry.com/track/'+num;
	window.open(trackUrl, '_blank').location;
	return false;
}
window.onload = function(){
	TTtoSetSize();
};
function TTtoSetSize() {
	var size,TTinput,TTinputSize,TTinputWidth,TTinputButton,TTinputItem;
	size=TTsizeSet();
	TTinputSize=(size.size) ? size.size : 'normal';
	TTinputWidth=(size.width) ? size.width : '';
	if (!/^\d*\.?\d*\%$/.test(TTinputWidth) && !/^\d*\.?\d*(px)$/.test(TTinputWidth)) {
		TTinputWidth='75%';
	}
	TTinput=document.getElementById("TTinput");
	TTinputButton=document.getElementsByClassName("TTinput-button")[0];
	TTinputItem=document.getElementsByClassName("TTinput-item")[0];
	TTinput.style.width=TTinputWidth;
	if(TTinputSize=='large') {
		TTinput.style.padding='9px';
		TTinput.style.maxHeight='68px';
		TTinputButton.style.height='50px';
		TTinputButton.style.padding='0 40px';
		TTinputButton.style.top=0;
		TTinputButton.style.marginRight='1px';
		TTinputItem.style.marginTop='2px';
	} else {
		TTinput.style.padding='3px';
		TTinput.style.maxHeight='51px;';
		TTinputButton.style.height='40px';
		TTinputButton.style.padding='0 22px';
		TTinputButton.style.top='3px';
		TTinputButton.style.marginRight='4px';
		TTinputItem.style.marginTop='1px';
	}
}


function trackPackage() {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwOTY1OWRiMC01MzY5LTExZWUtODBmNi04YmMwNzdiNTViMDAiLCJzdWJJZCI6IjY1MDNiNjVjM2RhNDYyNjgzOTE5MmUzZiIsImlhdCI6MTY5NDc0MjEwOH0.5Wx-XTO3_9kLGOR_QgnLCT3BjUt5mu3J6Ci1XglGyYQ'; // Replace with your actual API key
    const trackingUrl = 'https://parcelsapp.com/api/v3/shipments/tracking';
    
    const trackingNumber = document.getElementById("trackingNumber").value;
    
    const shipments = [{
        trackingId: trackingNumber,
        language: 'en',
        country: 'United States'
    }];

    $.post({
        url: trackingUrl,
        data: JSON.stringify({ apiKey: apiKey, shipments: shipments }),
        contentType: 'application/json',
        success: (response) => {
            const uuid = response.uuid;

            const checkTrackingStatus = () => {
                $.get({
                    url: `${trackingUrl}?apiKey=${apiKey}&uuid=${uuid}`,
                    success: (statusResponse) => {
                        if (statusResponse.done) {
                            document.getElementById("packageInfo").innerHTML = 'Tracking complete';
                        } else {
                            document.getElementById("packageInfo").innerHTML = 'Tracking in progress...';
                            setTimeout(checkTrackingStatus, 1000);
                        }
                    },
                    error: (err) => {
                        console.error(err);
                    }
                });
            }

            checkTrackingStatus();
        },
        error: (err) => {
            console.error(err);
        }
    });
}