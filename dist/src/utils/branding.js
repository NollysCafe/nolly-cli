import gradient from 'gradient-string';
import figlet from 'figlet';
export const branding = () => {
    const lavenderPinkGradient = gradient(['#d4a5ff', '#ff8bff']);
    const text = figlet.textSync('Create Nolly', { horizontalLayout: 'default' });
    return lavenderPinkGradient(text);
};
//# sourceMappingURL=branding.js.map