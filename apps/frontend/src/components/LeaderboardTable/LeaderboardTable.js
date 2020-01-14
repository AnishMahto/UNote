import React, { Component } from 'react';
import { Table, Paper, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination } from '@material-ui/core';
import { connect } from 'react-redux';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';

const styles = {
    tableRow: {
        display:"flex",
        flexDirection:"row",
    }
}

class LeaderboardTable extends Component {

    state = {
        page:0,
        data: [1],
    }

    componentDidMount() {
        fetch('/api/leaderboard', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`
            }
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            this.setState({
                data: responseData.data.sort ((a, b) => b.net_upvotes - a.net_upvotes)
            }, ()=> {
                this.setState({
                    dataLoaded:true
                });
            });            
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleChangePage = (event, page) => {
        this.setState({
            page,
        });
    }

    render() {
        return (
            <Paper  style={{margin:10}}>
                <Table>
                    <TableHead>
                        <TableRow style={styles.tableRow}>
                            <TableCell style={{flex:1}}>Rank</TableCell>
                            <TableCell style={{flex:9}}>Username</TableCell>
                            <TableCell style={{flex:3}}>Total Contributions</TableCell>
                            <TableCell style={{flex:3}}>Net Likes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((user, index) => {
                            return (
                                <TableRow style={styles.tableRow} key={Math.random()}>
                                    <TableCell style={{flex:1}}>{index+1}</TableCell>
                                    <TableCell style={{flex:10}}>{user.username}</TableCell>
                                    <TableCell style={{flex:3}}>{user.total_contributions}</TableCell>
                                    <TableCell style={{flex:3}}>{user.net_upvotes}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {/* <TablePagination 
                                rowsPerPageOptions={[10,30,50,100]} 
                                page={this.state.page} 
                                rowsPerPage={100}
                                count={this.state.data.length}
                                onChangePage={this.handleChangePage}/> */}
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps)(LeaderboardTable);