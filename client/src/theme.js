import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
	palette    : {
		primary   : {
			main : green[700]
		},
		secondary : {
			main : '#8C5612'
		}
	},
	typography : {
		fontFamily : 'circular'
	}
});

export default theme;
