import getCurrentCode from './getCurrentCode';

/**
 * User is Cmd+A to select all text
 */
function onSelectAll(event, data, change, opts) {
    const { value } = change;
    event.preventDefault();

    const currentCode = getCurrentCode(opts, value);
    return change
        .collapseToStartOf(currentCode.getFirstText())
        .extendToEndOf(currentCode.getLastText());
}

export default onSelectAll;
