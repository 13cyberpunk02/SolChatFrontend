const ConnectedUsers = ({ users }) => <div className='user-list'>
    <h5>Пользователи чата</h5>
    {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
</div>

export default ConnectedUsers;
