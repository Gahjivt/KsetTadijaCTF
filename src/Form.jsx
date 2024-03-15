import React, { useState } from 'react';
import { Input } from './components';
import { FormProvider, useForm } from 'react-hook-form';

export const Form = () => {
  const methods = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const [fileContent, setFileContent] = useState('');

  const onClickLink = () => {
    setLinkClicked(true);
  };

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      // Fetch the content of the file every time the button is pressed
      const response = await fetch('generatedKey.txt');
      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }
      const text = await response.text();
      setFileContent(text.trim());

      // Validate the input value against the content of the file
      if (data.key === "Key{" + text.trim() + "}") {
        setSubmitted(true);
      } else {
        console.log('Kljuc je kriv');
        // Set error message in state
        methods.setError('key', { type: 'manual', message: 'Kljuc je kriv' });
        // Handle incorrect key
      }
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
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
              className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
            >
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
