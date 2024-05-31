export default function reducer(state, action) {
    switch (action.type) {
        case 'light':
            return { mode: 'dark' };
        case 'dark':
            return { mode: 'light' };
        default:
            return { mode: 'light' };
    }
}