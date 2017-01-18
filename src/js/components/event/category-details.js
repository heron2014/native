import React, { PropTypes, Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import BarChart from '../../components/event/bar-chart';
import colours from '../../../styles/colours';

export default class CategoryDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedNodes: new Array(props.data.length).fill(false)
    };
    this._handleOnPress = this._handleOnPress.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
  }

  _handleOnPress (category, selection, index) {
    this.props.toggleSelection(category, selection);
    this.toggleHighlight(this.props.userIsHost, index);
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
      <View style={ { paddingTop: 80 } }>
        {
          data.map((datum, index) => {

            if (category === 'when') {
              return (
                <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                  <View style={{ width: 150 }}>
                    <Text style={{ alignSelf: 'center' }}>{ index === 0 && categoryTitle }</Text>
                  </View>

                  <View>
                    <View>
                      <Icon.Button
                        name={this.icons[category]}
                        size={16} color={this.state.selectedNodes[index] ? '#efefef' : colours[category]}
                        backgroundColor={this.state.selectedNodes[index] ? colours[category] : '#efefef'}
                        onPress={() => this._handleOnPress(category, { date: datum.date, time: datum.time }, index)}
                      >
                        { datum.date }
                        { datum.time || 'TBC' }
                      </Icon.Button>
                    </View>
                  </View>
                </View>
              );
            }
            return (
              <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                <View style={{ width: 150 }}>
                  <Text style={{ alignSelf: 'center' }}>{ index === 0 && categoryTitle }</Text>
                </View>

                <View>
                  <View>
                    <Icon.Button
                      name={this.icons[category]}
                      size={16} color={this.state.selectedNodes[index] ? '#efefef' : colours[category]}
                      backgroundColor={this.state.selectedNodes[index] ? colours[category] : '#efefef'}
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
