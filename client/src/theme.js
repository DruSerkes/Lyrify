import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
	palette    : {
		type    : 'dark',
		primary : {
			main : green[500]
		}
	},
	typography : {
		fontFamily : 'circular'
	},
	spacing    : (factor) => `${0.5 * factor}rem`
});

export default theme;
