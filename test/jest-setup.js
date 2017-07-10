import PropTypes from 'prop-types';
import injectTabEvent from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTabEvent();

global.__OPTIONS = {
  context: {
    muiTheme: getMuiTheme(),
    router: {
      push: jest.fn(),
      replace: jest.fn()
    }
  },
  childContextTypes: {
    muiTheme: PropTypes.object,
    router: PropTypes.object
  }
};
