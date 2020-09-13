import React, { Component } from 'react';
import TrackMapping from './track_name_mapping.json';
import SessionMapping from './session_mapping.json';
import CarMapping from './car_name_mapping.json';
import ResultsPage from './ResultsPage';
import Button from 'react-bootstrap/Button'

class Menu extends Component {
    fReader;
    content;
    constructor(props) {
        super(props);
        this.state = {dataLoaded: false, title: ''}
        this.fileInput = React.createRef();
        this.fReader = new FileReader();
    };

    onFileRead = (e) => {
        const content = this.fReader.result;
        
        const resContent = JSON.parse(content);

        let resultObj = {
            'session': SessionMapping[resContent.sessionType],
            'track': TrackMapping[resContent.trackName]
        };
        
        const leaderBoardLinesWithPos = this.addPositionField(resContent.sessionResult.leaderBoardLines);
        resultObj['leaderboard'] = leaderBoardLinesWithPos;

        resultObj = this.addCategories(resultObj);
        resultObj = this.markFastestLap(resultObj);

        this.content = resultObj;

        this.setState({dataLoaded: true});
    }

    msToTime = (ms) => {
        return new Date(ms).toISOString().slice(14, -1);
    }

    addPositionField = (lines) => {
        let cupPositions = {
            0: 0, // Overall
            1: 0, // ProAm
            2: 0, // Am
            3: 0, // Silver
            4: 0  // National
        };
        return lines.map((line, idx) => {
            cupPositions[line.car.cupCategory] += 1;

            line['position'] = idx+1;
            line['cupPosition'] = cupPositions[line.car.cupCategory];
            line['carName'] = CarMapping[line.car.carModel];
            line.timing['timeDiff'] = idx===0 ? 0 : lines[idx].timing.bestLap - lines[0].timing.bestLap;
            line.timing['timeDiffFormatted'] = idx===0 ? '' : '+' + this.msToTime(line.timing.timeDiff);
            line.timing['bestLapFormatted'] = this.msToTime(line.timing.bestLap);

            return line;
        });
    }

    addCategories = (resultObj) => {
        let cupCategories = [];

        console.log('---------');
        console.log(resultObj);
        console.log('---------');
        resultObj.leaderboard.forEach(line => {
            
            if (!cupCategories.includes(line.car.cupCategory)) {
                cupCategories.push(line.car.cupCategory);
            }
        });

        resultObj["cupCategories"] = cupCategories;

        return resultObj;
    }

    markFastestLap = (resultObj) => {
        let fastestLap = Number.MAX_SAFE_INTEGER;
        let fastestLapCar = undefined;
        resultObj.leaderboard.forEach(car => {
            if (car.timing.bestLap < fastestLap) {
                fastestLapCar = car;
                fastestLap = car.timing.bestLap;
            }
        })

        resultObj.leaderboard.forEach(car => {
            if (car.car.carId === fastestLapCar.car.carId) {
                car.timing['fastestLap'] = true;
            } else {
                car.timing['fastestLap'] = false;
            }
        })

        return resultObj;
    }

    onUpload = () => {
        this.fReader.onloadend = this.onFileRead;
        this.fReader.readAsText(this.fileInput.current.files[0], 'UTF-16LE');
    }

    handleChange = (event) => {    
        this.setState({title: event.target.value});  
    }

    render() {
        let component = 
        <div className='div-1'>
            <div><input type="file" ref={this.fileInput}/></div>
            <div><Button type="button" onClick={this.onUpload}>load</Button></div>
        </div>

        if (this.state.dataLoaded) {
            // scoreboardScreen -> [scoreboardPage] -> scoreboard -> [scoreBoardEntry]
            //component = <Scoreboard content={this.content} title={this.state.title}/>;
            component = <ResultsPage results={this.content}></ResultsPage>
        }
        return (
            <div>
                {component}
            </div>
        );
    }
}

export default Menu;