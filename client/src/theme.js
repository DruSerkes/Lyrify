import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
	palette    : {
		type      : 'dark',
		primary   : {
			main : green[500]
		},
		secondary : {
			main : deepOrange[500]
		}
	},
	typography : {
		fontFamily : 'monserrat'
	},
	spacing    : 7
});

export default theme;
