import React, { Component } from 'react';
import { Table, Paper, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination } from '@material-ui/core';

const styles = {
    tableRow: {
        display:"flex",
        flexDirection:"row",
    }
}

export default class LeaderboardTable extends Component {

    state = {
        page:0,
        data: [1],
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
                            <TableCell style={{flex:3}}># of Posts</TableCell>
                            <TableCell style={{flex:3}}>Net Likes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow style={styles.tableRow}>
                            <TableCell style={{flex:1}}>1</TableCell>
                            <TableCell style={{flex:10}}>lol lmao jr iii</TableCell>
                            <TableCell style={{flex:3}}>123</TableCell>
                            <TableCell style={{flex:3}}>69</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination 
                                rowsPerPageOptions={[10,30,50,100]} 
                                page={this.state.page} 
                                rowsPerPage={100}
                                count={this.state.data.length}
                                onChangePage={this.handleChangePage}/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}