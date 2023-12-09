import { useState } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

function GetHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    const [destinationTitlePage, setDestinationTitlePage] = useState('Detail Destination');

    switch (routeName) {
        // case 'Home':
        //     return 'Home';
        case 'Bookmarks':
            return 'Bookmarks';
        case 'Detail':
            return destinationTitlePage;
        case 'ChangeProfilePicture':
            return 'Change Profile Picture';
        case 'ManageProfile':
            return 'Manage Profile';
    }
}

export default GetHeaderTitle;
