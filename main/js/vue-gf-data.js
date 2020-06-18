app.formdata = {
  doc: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeGWJU9T7nqC_vS3ymaHJwvy68yf9v8HyG9bkX-9JCF646Y-w/formResponse',
  survey: [
    {
      name: 473022987,
      question: 'email',
      questiontype: 'text',
      label: 'email',
      placeholder: 'hogehoge@hoge.com',
      validate: 'required|email'
    },
     {
      name: 584517007,
      question: '名前',
      questiontype: 'text',
      label: 'username',
      placeholder: 'Your Name',
      validate: true
    },
    {
      name: 1364519753,
      question: 'Subject',
      questiontype: 'text',
      placeholder: 'Subject',
      validate: 'required'
    },
    {
      name: 1149745453,
      question: 'message',
      questiontype: 'text',
      placeholder: 'message...',
      validate: 'required'
    }
  ]
}