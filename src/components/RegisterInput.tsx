import { DataStore } from 'aws-amplify';
import React, { useState } from 'react'
import { Board, Person } from '../models';

const RegisterInput = () => {

    const [inputMessage, setInputMessage] = useState<string>("");
    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputImage, setInputImage] = useState<string>("");
    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setInputMessage(input);
    };
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setInputEmail(input);
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setInputImage(input);
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        DataStore.query(Person, pe => pe.email("eq", inputEmail)).then(value => {
            if (value.length === 0) {
                alert("登録されていないメールアドレスです")
                return;
            }
            const bd = new Board({
                personID: value[0].id,
                name: value[0].name,
                message: inputMessage,
                image: inputImage,
            });

            DataStore.save(bd).then(() => {
                alert("データを保存しました");
            })
        })
    }

    return (
        <div>
            <div>
                <label>メッセージ</label><br />
                <input type="text" name="message" required onChange={((e) => handleMessage(e))} />
            </div>
            <div>
                <label>メールアドレス</label><br />
                <input type="text" name="email" required onChange={((e) => handleEmail(e))} />
            </div>
            <div>
                <label>イメージ画像</label><br />
                <input type="text" name="image" onChange={((e) => handleImage(e))} />
            </div>
            <button onClick={((e) => handleClick(e))}>メッセージを登録</button>
        </div>
    )
}

export default RegisterInput