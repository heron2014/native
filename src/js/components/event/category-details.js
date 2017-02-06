import React, { PropTypes, Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
// import BarChart from '../../components/event/bar-chart';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const OFF_WHITE = '#efefef';

export default class CategoryDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedNodes: new Array(props.data.length).fill(false),
      isToggleable: props.data.length !== 1
    };
    this._handleOnPress = this._handleOnPress.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
  }

  _handleOnPress (category, selection, index) {
    if (this.state.isToggleable) {
      this.toggleHighlight(this.props.userIsHost, index);
      
      if (this.props.userIsHost) {
        this.props.toggleSelection(category, selection);
      } else {
        this.props.toggleSelection(category, index);
      }
    }
  }

  toggleHighlight (userIsHost, index) {
    let newNodes;
    if (userIsHost) { // host must select ONE option per category
      newNodes = new Array(this.props.data.length).fill(false);
      if (this.state.selectedNodes[index] === false) { // if toggling on
        newNodes[index] = !newNodes[index];
      }
    } else { // invitees can select multiple options per category
      newNodes = [...this.state.selectedNodes];
      newNodes[index] = !newNodes[index];
    }

    this.setState({
      selectedNodes: newNodes
    });
  }

  icons = {
    what: 'star',
    where: 'map-marker',
    when: 'calendar'
  }

  render () {
    const { category, data } = this.props;
    const categoryTitle = `W${category.substring(1)}`;

    return (
      <View>
        {
          data.map((datum, index) => {

            if (category === 'when') {
              return (
                <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                  <View style={{ flexBasis: 60 }}>
                    <Text style={styles.optionTitleWhat}>{ index === 0 && categoryTitle }</Text>
                  </View>

                  <View style={{ flexBasis: 300 }}>
                    <View>
                      <Icon.Button
                        name={this.icons[category]}
                        size={16}
                        borderRadius={100}
                        color={(!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category]}
                        backgroundColor={(!this.state.isToggleable && OFF_WHITE) || this.state.selectedNodes[index] ? colours[category] : OFF_WHITE}
                        onPress={() => this._handleOnPress(category, datum, index)}
                      >
                        { `${formatDate(datum, 'half')}, ${formatTime(datum) || 'TBC'}` }
                      </Icon.Button>
                    </View>
                  </View>
                </View>
              );
            }
            return (
              <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                <View style={{ flexBasis: 60 }}>
                  <Text style={styles.optionTitleWhat}>{ index === 0 && categoryTitle }</Text>
                </View>

                <View style={{ flexBasis: 300 }}>
                  <View>
                    <Icon.Button
                      name={this.icons[category]}
                      size={16}
                      borderRadius={100}
                      color={(!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category]}
                      backgroundColor={(!this.state.isToggleable && OFF_WHITE) || this.state.selectedNodes[index] ? colours[category] : OFF_WHITE}
                      onPress={() => this._handleOnPress(category, datum, index)}
                    >
                      { datum || 'TBC' }
                    </Icon.Button>
                  </View>
                </View>
              </View>
            );
          })
        }
      </View>
    );
  }
}

CategoryDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object]
    )
  ).isRequired,
  category: PropTypes.oneOf(
    ['what', 'where', 'when']
  ).isRequired
};