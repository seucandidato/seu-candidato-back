export const fakeMailer = {
  sendMail: jest.fn().mockImplementation(async (body) => {
    return {
      accepted: [body.to],
      rejected: [],
      ehlo: [
        'PIPELINING',
        'SIZE 48811212',
        'ETRN',
        'AUTH PLAIN LOGIN',
        'ENHANCEDSTATUSCODES',
        '8BITMIME',
        'DSN',
        'CHUNKING',
      ],
      envelopeTime: 708,
      messageTime: 473,
      messageSize: 604,
      response: '250 2.0.0 Ok: queued as 4VQW6d4Z90z5Z5qk',
      envelope: { from: 'no-reply@seucandidato.com', to: [body.to] },
      messageId: `<${Math.random().toString(36).substr(2, 9)}@seucandidato.com>`,
    };
  }),
};
