import React from "react";

const Form = React.memo(({ easy, click }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="levelInput" onSubmit={handleSubmit}>
      <label htmlFor="level">Wybierz poziom</label>
      {/* <p>//uuuuuuuuuuuuuuuooo</p> */}

      <br />
      <select ref={easy} id="level">
        <option value="easy">Łatwizna</option>
        <option value="harder">Rozgrzewka przed prawdziwymi problemami</option>
        <option value="hard">Nie dasz rady </option>
      </select>
      <button type="submit" onClick={click}>
        Rozpocznij poziom
      </button>
    </form>
  );
});

export default Form;
