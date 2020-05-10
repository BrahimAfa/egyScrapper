import PrettyError from 'pretty-error';

export const prettyConsole = (err) => {
    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage('express');
    console.log(pe.render(err));
};

export const SomeOtherLoggerLater = {};
