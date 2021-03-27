import React from 'react';
import Footer from '../footer/Footer';
import GeneralTabContainer from '../header/general-tab/GeneralTabContainer';

const ApplicationPageContainer: React.FC = ({ children }) => (
    <React.Fragment>
        <GeneralTabContainer />
        {children}
        <Footer />
    </React.Fragment>
);

export default ApplicationPageContainer;
