import { useState } from "react";
import "./qrCode.css";

function QRcode() {
  const [infos, setInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [qrdata, setQRdata] = useState();
  const [qrsize, setQRsize] = useState();
  function QRgenerator() {
    setLoading(true);
    try {
      if (qrdata && qrsize.length<=3) {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
        const trimdata = url.trim();
        setInfo(trimdata);
      }
    } catch (error) {
      console.error("error in url " + error);
    } finally {
      setLoading(false);
    }
  }
  async function QRdownload() {
    if (qrdata && qrsize) {
      await fetch(infos)
        .then((res) => res.blob())
        .then((blob) => {
          // creat a link to send the url
          const link = document.createElement("a");
          // then chage the url into img file by using createObjectURL
          link.href = URL.createObjectURL(blob);
          // then seting the downloading file name
          link.download = "qr.png";

          // adding the file to the frontend by using appendChild
          document.body.appendChild(link);
          // by assening the linlk.click() whlie clicking the button the fail download
          link.click();
          // then download start the file willbw closed in a sec
          document.body.removeChild(link);
        });
    }
  }

  return (
    <div className="continer">
      <h1>QR code generator</h1>
      {loading && <p>loading....</p>}
      {infos && <img src={infos} alt="qr image" />}
      <div className="input">
        <lable htmlfor="datainput">enter the image, text and any file link</lable>
        <input
          type="text"
          id="datainput"
          placeholder="Enter the DATA"
          value={qrdata}
          onChange={(e) => setQRdata(e.target.value)}
          disabled={loading}
        />
        <lable htmlfor="qrsize">QR code size (eg : 0 to 900)</lable>
        <input
          type="text"
          id="qrsize"
          placeholder="Enter the QR size"
          value={qrsize}
          onChange={(e) => setQRsize(e.target.value)}
        />
      </div>
      <div>
        <button className="genBUTTON" onClick={QRgenerator}>
          GENERATE QR CODE
        </button>
        <button className="dowBUTTON" onClick={QRdownload}>
          DOWNLOAD QR CODE
        </button>
      </div>
    </div>
  );
}

export default QRcode;
