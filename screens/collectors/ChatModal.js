import { useContext, useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ImageBackground
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NGOContext } from "../../context/NGOContext"
import { COLORS } from "../../colors"

const ChatModal = ({ visible, onClose, partner }) => {
  const { sendMessage, chatMessages } = useContext(NGOContext)
  const [messageText, setMessageText] = useState("")
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const flatListRef = useRef(null)

  const messages = chatMessages[partner?.id] || []

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      fadeAnim.setValue(0)
      slideAnim.setValue(50)
    }
  }, [visible])

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(partner?.id, messageText)
      setMessageText("")
      // Scroll to bottom after sending
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }

  const renderMessage = ({ item, index }) => {
    const isSent = item.sender === "collector"
    const showAvatar = index === 0 || messages[index - 1]?.sender !== item.sender
    
    return (
      <View style={[
        styles.messageRow,
        isSent ? styles.sentRow : styles.receivedRow
      ]}>
        {!isSent && showAvatar && (
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[COLORS.tertiary, COLORS.dark]}
              style={styles.avatar}
            >
              <MaterialCommunityIcons 
                name={partner?.type === "composting" ? "factory" : "storefront"} 
                size={18} 
                color={COLORS.white} 
              />
            </LinearGradient>
          </View>
        )}
        
        <View style={[
          styles.messageContainer,
          isSent ? styles.sentContainer : styles.receivedContainer,
          showAvatar && !isSent && styles.messageWithAvatar
        ]}>
          <LinearGradient
            colors={isSent ? 
              [COLORS.accent, '#9ABE73'] : 
              ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']
            }
            style={styles.messageBubble}
          >
            <Text style={[
              styles.messageText,
              isSent ? styles.sentMessageText : styles.receivedMessageText
            ]}>
              {item.text}
            </Text>
            <Text style={[
              styles.messageTime,
              isSent ? styles.sentMessageTime : styles.receivedMessageTime
            ]}>
              {item.time || "10:30 AM"}
            </Text>
          </LinearGradient>
          
          {isSent && (
            <View style={styles.messageStatus}>
              <MaterialCommunityIcons 
                name="check-all" 
                size={14} 
                color={item.read ? COLORS.accent : COLORS.mediumGray} 
              />
            </View>
          )}
        </View>
        
        {isSent && showAvatar && (
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primary_2]}
              style={styles.avatar}
            >
              <MaterialCommunityIcons name="truck" size={18} color={COLORS.white} />
            </LinearGradient>
          </View>
        )}
      </View>
    )
  }

  const getPartnerType = () => {
    if (!partner) return ""
    return partner.type === "organic_food" ? "Organic Supplier" : 
           partner.type === "carbon_rich" ? "Carbon Supplier" : 
           "Composting Center"
  }

  return (
    <Modal 
      visible={visible} 
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.keyboardView}
        >
          <Animated.View 
            style={[
              styles.chatContainer,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            {/* Header with Gradient */}
            <LinearGradient
              colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
              style={styles.header}
            >
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name="chevron-down" size={28} color={COLORS.primary} />
              </TouchableOpacity>
              
              <View style={styles.headerCenter}>
                <View style={styles.partnerInfo}>
                  <Text style={styles.headerTitle}>
                    {partner?.supplier || partner?.composting_center}
                  </Text>
                  <View style={styles.statusContainer}>
                    <View style={styles.statusDot} />
                    <Text style={styles.headerSubtitle}>
                      {getPartnerType()} • {partner?.contactPhone}
                    </Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.infoButton} activeOpacity={0.8}>
                <MaterialCommunityIcons name="information" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </LinearGradient>

            {/* Chat Background */}
            <ImageBackground
              source={require('../../assets/chat_bg.jpeg')} // Add a subtle pattern bg
              style={styles.chatBackground}
              imageStyle={styles.chatBackgroundImage}
            >
              {/* Messages List */}
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMessage}
                ListEmptyComponent={
                  <View style={styles.emptyChat}>
                    <LinearGradient
                      colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.6)']}
                      style={styles.emptyChatContainer}
                    >
                      <View style={styles.emptyChatIcon}>
                        <MaterialCommunityIcons name="chat-processing" size={56} color={COLORS.accent} />
                      </View>
                      <Text style={styles.emptyChatTitle}>Start a Conversation</Text>
                      <Text style={styles.emptyChatText}>
                        Send a message to {partner?.supplier?.split(" ")[0] || "the partner"} about delivery details
                      </Text>
                      <View style={styles.emptyChatTips}>
                        <Text style={styles.tipText}>💡 Tip: Discuss pickup time and quantity</Text>
                        <Text style={styles.tipText}>📱 Share updates via this chat</Text>
                      </View>
                    </LinearGradient>
                  </View>
                }
                contentContainerStyle={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              />

              {/* Input Area */}
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.98)', 'rgba(255, 255, 255, 0.95)']}
                style={styles.inputContainer}
              >
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Type your message here..."
                    placeholderTextColor={COLORS.mediumGray}
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline
                    maxLength={500}
                  />
                  
                  <View style={styles.inputActions}>
                    <TouchableOpacity style={styles.attachButton} activeOpacity={0.8}>
                      <MaterialCommunityIcons name="paperclip" size={22} color={COLORS.mediumGray} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.sendButton,
                        !messageText.trim() && styles.sendButtonDisabled
                      ]}
                      onPress={handleSendMessage}
                      disabled={!messageText.trim()}
                      activeOpacity={0.9}
                    >
                      <LinearGradient
                        colors={messageText.trim() ? 
                          [COLORS.accent, '#9ABE73'] : 
                          [COLORS.mediumGray, COLORS.lightGray]
                        }
                        style={styles.sendButtonGradient}
                      >
                        <MaterialCommunityIcons
                          name="send"
                          size={20}
                          color={COLORS.white}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>

              </LinearGradient>
            </ImageBackground>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '85%',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 234, 210, 0.2)',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(240, 234, 210, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  partnerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    opacity: 0.9,
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(240, 234, 210, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBackground: {
    flex: 1,
  },
  chatBackgroundImage: {
    opacity: 1,
  },
  messagesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  sentRow: {
    justifyContent: 'flex-end',
  },
  receivedRow: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginHorizontal: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  messageContainer: {
    maxWidth: '75%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sentContainer: {
    flexDirection: 'row-reverse',
  },
  receivedContainer: {
    flexDirection: 'row',
  },
  messageWithAvatar: {
    marginLeft: 8,
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '100%',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  sentMessageText: {
    color: COLORS.white,
  },
  receivedMessageText: {
    color: COLORS.dark,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
  sentMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  receivedMessageTime: {
    color: COLORS.tertiary,
  },
  messageStatus: {
    marginHorizontal: 6,
    marginBottom: 4,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyChatContainer: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(169, 132, 103, 0.1)',
    borderStyle: 'dashed',
    width: '100%',
  },
  emptyChatIcon: {
    marginBottom: 20,
  },
  emptyChatTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyChatText: {
    fontSize: 15,
    color: COLORS.tertiary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyChatTips: {
    gap: 8,
    width: '100%',
  },
  tipText: {
    fontSize: 13,
    color: COLORS.mediumGray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(169, 132, 103, 0.1)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(240, 234, 210, 0.3)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 120,
    color: COLORS.dark,
    borderWidth: 2,
    borderColor: 'rgba(169, 132, 103, 0.8)',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(240, 234, 210, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(169, 132, 103, 0.2)',
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHint: {
    fontSize: 12,
    color: COLORS.mediumGray,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
})

export default ChatModal