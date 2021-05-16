import React from 'react';

function GeneralBanner(props) {
    const data = props.text;
    return (
        <section id="section1shop" className="section1shop">
            <div>
            </div>
            <h1>
                {data}
            </h1>
        </section>
    );
}

export default GeneralBanner;