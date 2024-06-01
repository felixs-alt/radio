import React from 'react'
import axios from "axios";


class Player extends React.Component {
    constructor(props) {
        super(props)

        this.upload = this.upload.bind(this);
    }
    async upload(file) {
        console.info(file)
        const formData = new FormData();
        formData.append("file", file);
        try {   
            const resp = await fetch("https://pixeldrain.com/api/file",{
                method: "POST",
                body: formData,
            }
                
            )
            if(resp.status >= 400) {
                throw new Error(await resp.json())
            }
            const result = await resp.json()
            const url = "https://pixeldrain.com/api/file/"+result.id;
            console.log(url);
            
            console.log(await axios.post("http://188.150.47.164:3001/startmusic?url="+url));
          } catch (error) {
            console.error(error);
          }

    }
    fileinput(e) {
        if (e.target.files[0]) {
            new Player(this).upload(e.target.files[0])
        }
    }


    render() {
        return (
            <div>
                <center>
                <p>Input WAV file</p>
                <input type="file" id="input" onChange={this.fileinput} accept="audio/wav"/>
                </center>
            </div>
        )
    }
}

export default Player