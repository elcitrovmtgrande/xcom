import Toast from 'react-native-root-toast';

class Popup {
  static message(message) {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: -100,
      shadow: true,
      animation: true,
      hideOnPress: true,
      opacity: 1,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  }
}

export default Popup;
