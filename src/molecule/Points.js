import React from 'react';

const Points = React.memo(({points}) => {
    return (
        <>
        <h5>Liczba zdobytych punktów</h5>
        <div>{points}</div>
        </>
      );
})
 
export default Points;