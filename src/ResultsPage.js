import React, { Component } from 'react';
import ResultsTab from './ResultsTab';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CupMapping from './cup_category_mapping.json';

class ResultsPage extends Component {
    constructor(props) {
        super(props);
    };

    getResultsForCategory(category) {
        if (category === 'Overall') {
            return this.props.results.leaderboard;
        }

        const categoryNumber = Object.keys(CupMapping).find(key => CupMapping[key] === category);

        return this.props.results.leaderboard.filter(line => {
            return line.car.cupCategory === parseInt(categoryNumber, 10);
        });
    }

    render() {
        let allCategories = this.props.results.cupCategories;
        allCategories.sort();
        allCategories = allCategories.map(category => {
            return CupMapping[category]
        })
        allCategories.unshift('Overall');
        return (
            <div>
                <Tabs className="category-tabs">
                    {allCategories.map(category => {
                        return (<Tab eventKey={category} title={category} key={category}>
                            <div className="result-tab">
                                <ResultsTab lines={this.getResultsForCategory(category)} />
                            </div>
                            
                        </Tab>)
                    })}
                </Tabs>
                
            </div>
        );
    }
}

export default ResultsPage;