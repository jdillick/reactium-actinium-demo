/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

const chalk = require('chalk');
const generator = require('./generator');
const prettier = require('prettier');
const path = require('path');
const mod = path.dirname(require.main.filename);
const { error, message } = require(`${mod}/lib/messenger`);

/**
 * NAME String
 * @description Constant defined as the command name. Value passed to the commander.command() function.
 * @example $ arcli reactium empty
 * @see https://www.npmjs.com/package/commander#command-specific-options
 * @since 2.0.0
 */
const NAME = 'empty';

/**
 * DESC String
 * @description Constant defined as the command description. Value passed to
 * the commander.desc() function. This string is also used in the --help flag output.
 * @see https://www.npmjs.com/package/commander#automated---help
 * @since 2.0.0
 */
const DESC = 'Reactium: Remove Reactium demo pages, components, and toolkit.';

/**
 * CANCELED String
 * @description Message sent when the command is canceled
 * @since 2.0.0
 */
const CANCELED = 'Reactium empty canceled!';

/**
 * confirm({ props:Object, params:Object }) Function
 * @description Prompts the user to confirm the operation
 * @since 2.0.0
 */
const CONFIRM = ({ props, params }) => {
    const { prompt } = props;

    return new Promise((resolve, reject) => {
        prompt.get(
            {
                properties: {
                    confirmed: {
                        description: `${chalk.white(
                            'This is a destructive operation. Are you sure?',
                        )} ${chalk.cyan('(Y/N):')}`,
                        type: 'string',
                        required: true,
                        pattern: /^y|n|Y|N/,
                        message: ` `,
                        before: val => {
                            return String(val).toLowerCase() === 'y';
                        },
                    },
                },
            },
            (error, input) => {
                let confirmed;

                try {
                    confirmed = input.confirmed;
                } catch (err) {
                    confirmed = false;
                }

                if (error || confirmed === false) {
                    reject(error);
                } else {
                    resolve(confirmed);
                }
            },
        );
    });
};

/**
 * conform(input:Object) Function
 * @description Reduces the input object.
 * @param input Object The key value pairs to reduce.
 * @since 2.0.0
 */
const CONFORM = ({ input, props }) => {
    const { cwd } = props;

    let output = {};

    Object.entries(input).forEach(([key, val]) => {
        switch (key) {
            default:
                output[key] = val;
                break;
        }
    });

    if (!Object.entries(output).length) {
        output = {
            demo: true,
            font: true,
            images: true,
            style: true,
            toolkit: true,
        };
    }

    return output;
};

/**
 * HELP Function
 * @description Function called in the commander.on('--help', callback) callback.
 * @see https://www.npmjs.com/package/commander#automated---help
 * @since 2.0.0
 */
const HELP = () => {
    console.log('');
    console.log('Usage:');
    console.log('');
    console.log(' Keep the default toolkit:');
    console.log('  $ arcli reactium empty --no-toolkit');
    console.log('');
    console.log(' Keep the demo site:');
    console.log('  $ arcli reactium empty --no-demo');
    console.log('');
};

/**
 * ACTION Function
 * @description Function used as the commander.action() callback.
 * @see https://www.npmjs.com/package/commander
 * @param opt Object The commander options passed into the function.
 * @param props Object The CLI props passed from the calling class `orcli.js`.
 * @since 2.0.0
 */
const ACTION = ({ opt, props }) => {
    console.log('');

    const { cwd, prompt } = props;

    const ovr = ['demo', 'font', 'images', 'style', 'toolkit'].reduce(
        (obj, key) => {
            let val = opt[key];
            val = typeof val === 'function' ? null : val;
            if (val) {
                obj[key] = val;
            }
            return obj;
        },
        {},
    );

    const params = CONFORM({ input: ovr, props });

    CONFIRM({ props, params })
        .then(() => {
            console.log('');
            generator({ params, props }).then(success => {
                console.log('');
            });
        })
        .catch(err => {
            prompt.stop();
            message(CANCELED);
        });
};

/**
 * COMMAND Function
 * @description Function that executes program.command()
 */
const COMMAND = ({ program, props }) =>
    program
        .command(NAME)
        .description(DESC)
        .action(opt => ACTION({ opt, props }))
        .option('-D, --demo', 'Empty the demo.')
        .option('-T, --toolkit', 'Empty toolkit elements.')
        .option('-S, --style', 'Empty ~/src/assets/style/style.scss file.')
        .option('-F, --font', 'Empty ~/src/assets/fonts directory.')
        .option('-I, --images', 'Empty ~/src/assets/images directory.')
        .on('--help', HELP);

/**
 * Module Constructor
 * @description Internal constructor of the module that is being exported.
 * @param program Class Commander.program reference.
 * @param props Object The CLI props passed from the calling class `arcli.js`.
 * @since 2.0.0
 */
module.exports = {
    ACTION,
    CONFIRM,
    CONFORM,
    COMMAND,
    NAME,
};
