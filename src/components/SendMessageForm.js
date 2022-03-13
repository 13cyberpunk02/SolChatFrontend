import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import Picker from 'emoji-picker-react';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
      };

    return <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
        <InputGroup>
            <FormControl type="user" placeholder="message..."
                onChange={e => setMessage(e.target.value)} value={message}  />
                <InputGroup>
                  <div>
                    {chosenEmoji ? (
                    <span>You chose: {chosenEmoji.emoji}</span>
                        ) : (<span>No emoji Chosen</span>)}
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                </InputGroup>
            <InputGroup>
                <Button variant="primary" type="submit" disabled={!message}>Отправить</Button>
            </InputGroup>
        </InputGroup>
    </Form>
}

export default SendMessageForm;
