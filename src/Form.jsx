import { Input } from './components'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'



export const Form = () => {
  const methods = useForm();
  const [submitted, setSubmitted] = useState(false);  //pokusaj submitanja
  const [linkClicked, setLinkClicked] = useState(false);  //slika hyperlink

  const onClickLink = () => {
    setLinkClicked(true);
  };
  const onSubmit = methods.handleSubmit(data => {
    // forma
    console.log(data);
    setSubmitted(true); // kad je tocno
  });

  const keyValidation = {
    name: 'key',
    label: 'Key',
    type: 'text',
    id: 'key',
    placeholder: 'Key{ovdje stavljate zastavicu} ',
    validation: {
      required: {
        value: true,
        message: 'Kljuc nije NULL',
      },
      maxLength: {
        value: 20,
        message: 'Kljuc nije dulji od 20 znakova',
      },
      validate: value => value === 'Key{UqvyisJ}' || 'Kljuc je kriv', // Usporedi sa tocnom vrijednosti
    },
  };

  return (
    <FormProvider {...methods}>
      {!submitted ? (
        <form
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
          className="container"
        >
          <div>

          <p>
            Download picture:{" "}
            <a
              href="/kapa.jpeg"
              download
              style={{ color: linkClicked ? "#8DB8FF" : "#0060FF" }}
              onClick={onClickLink}
            >
              kapa.jpeg
            </a>
          </p>
          
          </div>
          <div className="grid gap-5 md:grid-cols-2">
          
            <Input {...keyValidation} />
          </div>
          <div className="mt-5">

            <button
              type="submit"
              className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800">
              Pošalji
            </button>
          </div>
        </form>
      ) : (
        <div className="container">
          <h2>Cestitke, rješili ste moj CTF</h2>

        </div>
      )}
    </FormProvider>
  );
};