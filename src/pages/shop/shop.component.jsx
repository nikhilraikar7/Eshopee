import React , {useEffect} from 'react';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';
import { connect } from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching , selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';
import CollectionPageContainer from '../collection/collection.container';
import { ShopPageContainer } from './shop.styles';



const ShopPage = ({fetchCollectionsStart , match }) => {
    useEffect(() => {
        fetchCollectionsStart();
    },[fetchCollectionsStart]);

    // componentDidMount(){
    //     const { fetchCollectionsStart } = this.props;
    //     fetchCollectionsStart();
    // }
    
        return(
            <ShopPageContainer>
                <Route exact path={`${match.path}`} 
                component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer} />
            </ShopPageContainer>
        );
    }



const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart : () => dispatch(fetchCollectionsStart())
});

export default connect(null , mapDispatchToProps ) (ShopPage) ;