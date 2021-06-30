import React from 'react';

function Test() {

    const func = () => {
        const list = []
        for (let i = 0; i < 5; i++) {
            list.push(<div>{i}</div>)
        }
        return list;
    }
    return (
        <div>
            {
                func()
            }
        </div>
    );
}


export default Test;