import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
	palette    : {
		type      : 'dark',
		primary   : {
			main : green[500]
		},
		secondary : {
			main : '#8C5612'
		}
	},
	typography : {
		fontFamily : 'circular'
	},
	spacing    : 5
});

export default theme;
