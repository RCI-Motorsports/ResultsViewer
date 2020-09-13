import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import CupMapping from './cup_category_mapping.json';

class ResultsTab extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Table className='result-table' variant='dark' hover>
                <thead>
                    <tr>
                        <th>Overall pos</th>
                        <th>Category pos</th>
                        <th>Car #</th>
                        <th>Name</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.lines.map(line => {
                        const name = line.currentDriver.firstName + " " + line.currentDriver.lastName;
                        return (
                            <tr className={CupMapping[line.car.cupCategory]}>
                                <td>{line.position}</td>
                                <td>{line.cupPosition}</td>
                                <td>{line.car.raceNumber}</td>
                                <td>{name}</td>
                                <td className = {line.timing.fastestLap ? 'fastest' : ''}>{CupMapping[line.car.cupCategory]}</td>
                            </tr>)
                    })}
                </tbody>
                
            </Table>
        );
    }
}

export default ResultsTab;