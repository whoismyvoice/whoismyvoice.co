import { Chamber, Legislator } from '../../models/Legislator';
import {
  Props as TitleProps,
  State as TitleState,
  Title,
} from '../Title/Title';

import '../../styles/TitleComponent.scss';

interface Props extends TitleProps {
  legislators: Array<Legislator>;
}

type State = TitleState;

export function getMemberType(legislators: Array<Legislator>) {
  let memberType;
  const { Senate, House } = Chamber;
  if (legislators.length === 1) {
    const [rep] = legislators;
    return rep.chamber === Senate ? 'Senator' : 'Representative';
  } else if (legislators.length === 2) {
    const chambers = legislators.map(legislator => legislator.chamber);
    const houseIndex = chambers.findIndex(chamber => chamber === House);
    if (houseIndex === -1) {
      memberType = 'Senators';
    } else if (houseIndex === 0) {
      memberType = 'Representative & Senator';
    } else {
      // so `houseIndex === 1`
      memberType = 'Senator & Representative';
    }
  } else if (legislators.length === 3) {
    memberType = 'Senators & Representative';
  } else if (legislators.length === 0) {
    throw new Error('Not enough legislators provided.');
  } else {
    throw new Error('Too many legislators provided.');
  }
  return memberType;
}

export class MemberResultsTitle extends Title<Props, State> {
  static defaultProps = {
    ...Title.defaultProps,
    legislators: [],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      templateData: {
        ...props.templateData,
        memberType: getMemberType(props.legislators),
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
    const { legislators } = nextProps;
    this.setState({
      templateData: {
        ...this.state.templateData,
        ...nextProps.templateData,
        memberType: getMemberType(legislators),
      },
    });
  }
}
