import React from 'react';
import Form from '../molecule/Form';
import Points from '../molecule/Points';

const Console = React.memo(({ points, easy, click}) => {

    return (
        <main className='pointsForm'>
            <Points points={ points } />
            <Form click={ click } easy={ easy } />
          
        </main>
    );
})

export default Console;