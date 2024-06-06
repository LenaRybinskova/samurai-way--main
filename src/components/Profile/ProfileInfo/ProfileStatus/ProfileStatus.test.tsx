import {create} from 'react-test-renderer';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import {updateProfileStatusTC} from '../../../../redux/profileReducer';

describe("ProfileStatus Component", () => {
/*    приходящие пропсы(знач Статус) должны перейти в стейт*/
    test("status from props should be in state", () => {

        const component = create(<ProfileStatus status="IT INCUBATOR"  updateProfileStatusTC={updateProfileStatusTC}/>);
        const instance = component.getInstance(); //созд объект ( компон) для взаимодествия
        expect(instance).not.toBeNull();
        // @ts-ignore
        expect(instance.state.status).toBe("IT INCUBATOR");
    });
});
