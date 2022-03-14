import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import Emoji from 'emoji-picker-react';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
      };
    
    return <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
        <InputGroup>
            <FormControl type="user" placeholder="Сообщение..."
                onChange={e => setMessage(e.target.value)} value={message}>
                 
            </FormControl>
            <InputGroup>
                <Button variant="primary" type="submit" disabled={!message}>Отправить</Button>               
            </InputGroup>
        </InputGroup>
    </Form>
}

export default SendMessageForm;
