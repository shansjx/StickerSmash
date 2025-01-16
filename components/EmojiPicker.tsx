
// Modal Sliding Up and Down Animation with Static Dimmed Background
import { PropsWithChildren } from 'react';
import { Modal, View, Text, Pressable, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
    const slideAnim = useRef(new Animated.Value(300)).current; // Initial off-screen position


    useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0, // Final position
                duration: 350, // Animation duration
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300, // Slide back down
                duration: 350,
                useNativeDriver: true,
            }).start(() => {
                onClose();
            });
        }
    }, [isVisible]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: 350,
            duration: 350,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };


    return (
        <Modal animationType="none" transparent={true} visible={isVisible}>
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[
                    styles.modalContentContainer,
                    { transform: [{ translateY: slideAnim }] }, // Apply animation
                ]}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    <Pressable onPress={handleClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                {children}
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
    },
    modalContentContainer: {
        bottom: 0,
        width: '100%',
        backgroundColor: '#25292e',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        overflow: 'hidden',
        position: 'absolute',
        height: '25%',
    },
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        bottom: 0,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
    closeText: {
        color: '#fff',
        fontSize: 16,
    },
});

// Modal With Dimmed Background Both Sliding Up Animation
// import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
// import { PropsWithChildren } from 'react';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// type Props = PropsWithChildren<{
//     isVisible: boolean;
//     onClose: () => void;
// }>;

// export default function EmojiPicker({ isVisible, children, onClose }: Props) {
//     return (
//         <Modal animationType="slide" transparent={true} visible={isVisible}>
//             <TouchableWithoutFeedback onPress={onClose}>
//                 <View style={styles.overlay}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.titleContainer}>
//                             <Text style={styles.title}>Choose a sticker</Text>
//                             <Pressable onPress={onClose}>
//                                 <MaterialIcons name="close" color="#fff" size={22} />
//                             </Pressable>
//                         </View>
//                         {children}
//                     </View>
//                 </View>
//             </TouchableWithoutFeedback>

//         </Modal>

//     );
// }

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
//     },
//     modalContent: {
//         height: '25%',
//         width: '100%',
//         backgroundColor: '#25292e',
//         borderTopRightRadius: 18,
//         borderTopLeftRadius: 18,
//         position: 'absolute',
//         bottom: 0,
//     },
//     titleContainer: {
//         height: '16%',
//         backgroundColor: '#464C55',
//         borderTopRightRadius: 10,
//         borderTopLeftRadius: 10,
//         paddingHorizontal: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     title: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });
