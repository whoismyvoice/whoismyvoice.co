import PropTypes from 'prop-types';

import { Legislator, } from '../models/Legislator';
import { Title } from './Title';

import '../styles/TitleComponent.css';

export class MemberResultsTitle extends Title {
  static defaultProps = {
    legislators: [],
  }

  static propTypes = {
    legislators: PropTypes.arrayOf(PropTypes.instanceOf(Legislator)),
  }

  constructor(props) {
    super(props);
    this.state = {
      templateData: {
        ...(props.templateData),
        memberType: MemberResultsTitle.getMemberType(props.legislators),
      },
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { legislators, } = nextProps;
    this.setState({
      templateData: {
        ...(this.state.templateData),
        ...(nextProps.templateData),
        memberType: MemberResultsTitle.getMemberType(legislators),
      },
    });
  }

  static getMemberType(legislators) {
    let memberType;
    if (legislators.length === 1) {
      const [ rep, ] = legislators;
      memberType = rep.chamber === 'senate' ? 'Senator' : 'Representative';
    } else if (legislators.length === 2) {
      const chambers = legislators.map(legislator => legislator.chamber);
      const houseIndex = chambers.findIndex(chamber => chamber === 'house');
      if (houseIndex === -1) {
        memberType = 'Senators';
      } else if (houseIndex === 0) {
        memberType = 'Representative & Senator';
      } else if (houseIndex === 1) {
        memberType = 'Senator & Representative';
      }
    } else if (legislators.length === 3) {
      memberType = 'Senators & Representative';
    } else {
      throw new Error('Too many legislators provided.');
    }
    return memberType;
  }
}
