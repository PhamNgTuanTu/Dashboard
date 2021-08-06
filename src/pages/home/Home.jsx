import React from 'react';

function Home(props) {
    const nameControl = 'Trang Chủ';
    document.title = nameControl;
    return (
        <section className="home-section">
            <div>
                <div className="row mb-3">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
                        <div className="counter bg-primary">
                            <p>
                                <i className="fas fa-tasks" />
                            </p>
                            <h3>100+</h3>
                            <p>To do</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
                        <div className="counter bg-warning">
                            <p>
                                <i className="fas fa-spinner" />
                            </p>
                            <h3>100+</h3>
                            <p>In progress</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
                        <div className="counter bg-success">
                            <p>
                                <i className="fas fa-check-circle" />
                            </p>
                            <h3>100+</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-sm-3 mb-3">
                        <div className="counter bg-danger">
                            <p>
                                <i className="fas fa-bug" />
                            </p>
                            <h3>100+</h3>
                            <p>Issues</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-xl-8">
                        <div className="card">
                            <div className="card-header">
                                <h3>
                                    Table
                                </h3>
                                <i className="fas fa-ellipsis-h" />
                            </div>
                            <div className="card-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Project</th>
                                            <th>Manager</th>
                                            <th>Status</th>
                                            <th>Due date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>React</td>
                                            <td>Tran Anh Tuat</td>
                                            <td>
                                                <span className="dot">
                                                    <i className="bg-success" />
                                                    Completed
                                                </span>
                                            </td>
                                            <td>17/07/2020</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Vue</td>
                                            <td>Bui Nhu Sang</td>
                                            <td>
                                                <span className="dot">
                                                    <i className="bg-warning" />
                                                    In progress
                                                </span>
                                            </td>
                                            <td>18/07/2020</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Laravel</td>
                                            <td>Phan Nhat Truong</td>
                                            <td>
                                                <span className="dot">
                                                    <i className="bg-warning" />
                                                    In progress
                                                </span>
                                            </td>
                                            <td>17/07/2020</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Django</td>
                                            <td>Le Anh Tuan</td>
                                            <td>
                                                <span className="dot">
                                                    <i className="bg-danger" />
                                                    Delayed
                                                </span>
                                            </td>
                                            <td>07/07/2020</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>MEAN</td>
                                            <td>John Evan</td>
                                            <td>
                                                <span className="dot">
                                                    <i className="bg-primary" />
                                                    Pending
                                                </span>
                                            </td>
                                            <td>20/08/2020</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>MERN</td>
                                            <td>Robert</td>
                                            <td>
                                                <span className="dot">
                                                    <i className="bg-primary" />
                                                    Pending
                                                </span>
                                            </td>
                                            <td>20/08/2020</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4">
                        <div className="card">
                            <div className="card-header">
                                <h3>
                                    Progress bar
                                </h3>
                                <i className="fas fa-ellipsis-h" />
                            </div>
                            <div className="card-content">
                                <div className="progress-wrapper">
                                    <p>
                                        Less than 1 hour
                                        <span className="float-right">50%</span>
                                    </p>
                                    <div className="progress">
                                        <div className="bg-success" style={{ width: '50%' }} />
                                    </div>
                                </div>
                                <div className="progress-wrapper">
                                    <p>
                                        1 - 3 hours
                                        <span className="float-right">60%</span>
                                    </p>
                                    <div className="progress">
                                        <div className="bg-primary" style={{ width: '60%' }} />
                                    </div>
                                </div>
                                <div className="progress-wrapper">
                                    <p>
                                        More than 3 hours
                                        <span className="float-right">40%</span>
                                    </p>
                                    <div className="progress">
                                        <div className="bg-warning" style={{ width: '40%' }} />
                                    </div>
                                </div>
                                <div className="progress-wrapper">
                                    <p>
                                        More than 6 hours
                                        <span className="float-right">20%</span>
                                    </p>
                                    <div className="progress">
                                        <div className="bg-danger" style={{ width: '20%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>

    );
}

export default Home;