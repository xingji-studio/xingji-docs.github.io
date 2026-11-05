# XJ380 API 规范 (C++) 版本 1.4

2026/11/5

XJ380 API Specification      C\\C++版

VERSION 1.4

版权所有© XINGJI Interactive Software 2017 – 2026 保留所有权利。“星际工作室”“XINGJI 工作室”“XINGJI Studios”均为 XINGJI Interactive Software 的别名。“XJ380”“XJ380OS”“XJ380操作系统”均为XJ380操作系统的别名，归XINGJI Interactive Software所有。“BridgeEngine”“鹊桥引擎”“bapi”均为BridgeEngine的别名，归XINGJI Interactive Software及其旗下工作室XINGJI Games所有。“xapi”“XJ380 API”“XJ380应用程序接口”均为XJ380 API别名，归XINGJI Interactive Software所有。除适用于POSIX标准的XJ380 API外最终解释权归 XINGJI 工作室所有。适用于POSIX标准的XJ380 API最终解释权归IEEE所有。本手册由XINGJI董事会组织编写。工作室总部地址：太阳宫南街8号。请勿邮寄任何快递，寄往此地址的快递我们不会收货（也没法收货）。如有邮寄需要，请联系XINGJI 工作室董事会。更多信息请参见XINGJI工作室官网（www.xingjisoft.com）。

<a id="manual-contents"></a>

# 目录

CONTENTS

* [CHAPTER 1 – 关于、编译和专有类型](#xapi-1)
    * [1-1 关于](#xapi-1-1)
    * [1-2 编译为XJ380应用程序](#xapi-1-2)
    * [1-3 专有类型概览](#xapi-1-3)
    * [1-4 用户及权限](#xapi-1-4)
    * [1-5 辨别XJ380环境](#xapi-1-5)
    * [1-6 配置文件存放规范](#xapi-1-6)
    * [1-7 读取和修改设置](#xapi-1-7)
* [CHAPTER 2 – XJ380 API (POSIX版)](#xapi-2)
    * [2-1 简介](#xapi-2-1)
* [CHAPTER 3 – XJ380 API (XAPI版)](#xapi-3)
    * [3-1 文本输入输出](#xapi-3-1)
        * [3-1-1 xapi\_Output();](#xapi-3-1-1)
        * [3-1-2 xapi\_Input();](#xapi-3-1-2)
        * [3-1-3 xapi\_Getline();](#xapi-3-1-3)
        * [3-1-4 xapi\_Getch();](#xapi-3-1-4)
        * [3-1-5 xapi\_EndLine();](#xapi-3-1-5)
        * [3-1-6 xapi\_PrintLine();](#xapi-3-1-6)
        * [3-1-7 xapi\_Printf();](#xapi-3-1-7)
        * [3-1-8 xapi\_OutputSerial();](#xapi-3-1-8)
    * [3-2 文件操作](#xapi-3-2)
        * [3-2-1 XFILE类型](#xapi-3-2-1)
        * [3-2-2 xapi\_OpenFile();](#xapi-3-2-2)
        * [3-2-3 xapi\_CloseFile();](#xapi-3-2-3)
        * [3-2-4 目录搜索](#xapi-3-2-4)
            * [3-2-4-1 DirNode类型](#xapi-3-2-4-1)
            * [3-2-4-2 xapi\_SearchFile();](#xapi-3-2-4-2)
            * [3-2-4-3 xapi\_SearchFile\_freem();](#xapi-3-2-4-3)
        * [3-2-5 xapi\_Mkdir();](#xapi-3-2-5)
        * [3-2-6 xapi\_CreateFile();](#xapi-3-2-6)
        * [3-2-7 xapi\_DeleteFile();](#xapi-3-2-7)
        * [3-2-8 xapi\_RenameFile();](#xapi-3-2-8)
        * [3-2-9 xapi\_ReadFile();](#xapi-3-2-9)
        * [3-2-10 xapi\_WriteFile();](#xapi-3-2-10)
        * [3-2-11 xapi\_Rmdir();](#xapi-3-2-11)
        * [3-2-12 xapi\_FileDialog();](#xapi-3-2-12)
    * [3-3 类型转换](#xapi-3-3)
        * [3-3-1 xcr\_char2int();](#xapi-3-3-1)
        * [3-3-2 xcr\_int2char();](#xapi-3-3-2)
        * [3-3-3 xcr\_hex2char();](#xapi-3-3-3)
        * [3-3-4 toRGB();](#xapi-3-3-4)
        * [3-3-5 toRGBA();](#xapi-3-3-5)
    * [3-4 进程与线程](#xapi-3-4)
        * [3-4-1 XapiTaskInfo类型](#xapi-3-4-1)
        * [3-4-2 xapi\_Fork();](#xapi-3-4-2)
        * [3-4-3 xapi\_Execve();](#xapi-3-4-3)
        * [3-4-4 xapi\_Exit();](#xapi-3-4-4)
        * [3-4-5 xapi\_GetTaskList();](#xapi-3-4-5)
        * [3-4-6 xapi\_KillProcess();](#xapi-3-4-6)
    * [3-5 获取当前信息](#xapi-3-5)
        * [3-5-1 UserInfo类型](#xapi-3-5-1)
        * [3-5-2 TimeType类型](#xapi-3-5-2)
        * [3-5-3 xapi\_GetSystemVersion();](#xapi-3-5-3)
        * [3-5-4 xapi\_GetTime();](#xapi-3-5-4)
        * [3-5-5 xapi\_GetCurrentUser();](#xapi-3-5-5)
        * [3-5-6 xapi\_GetTimeX();](#xapi-3-5-6)
        * [3-5-7 xapi\_GetCpuModel();](#xapi-3-5-7)
        * [3-5-8 xapi\_GetMemorySize();](#xapi-3-5-8)
        * [3-5-9 xapi\_GetTimeNano();](#xapi-3-5-9)
    * [3-6 运行](#xapi-3-6)
        * [3-6-1 XapiSystemStats类型](#xapi-3-6-1)
        * [3-6-2 xapi\_Broken();](#xapi-3-6-2)
        * [3-6-3 xapi\_Sleep();](#xapi-3-6-3)
        * [3-6-4 xapi\_Run();](#xapi-3-6-4)
        * [3-6-5 xapi\_FlushTime();](#xapi-3-6-5)
        * [3-6-6 xapi\_GetSystemStats();](#xapi-3-6-6)
        * [3-6-7 xapi\_RunArgs();](#xapi-3-6-7)
        * [3-6-8 xapi\_SpawnInherited();](#xapi-3-6-8)
        * [3-6-9 xapi\_PowerAction();](#xapi-3-6-9)
    * [3-7 内存](#xapi-3-7)
        * [3-7-1 xapi\_AllocateMemory();](#xapi-3-7-1)
        * [3-7-2 xapi\_FreeMemory();](#xapi-3-7-2)
        * [3-7-3 xapi\_MapMemory();](#xapi-3-7-3)
    * [3-8 音频](#xapi-3-8)
        * [3-8-1 PCM音频流接口](#xapi-3-8-1)
            * [3-8-1-1 XAudioDeviceInfo类型](#xapi-3-8-1-1)
            * [3-8-1-2 XAudioDeviceSettings类型](#xapi-3-8-1-2)
            * [3-8-1-3 XAudioDesc类型](#xapi-3-8-1-3)
            * [3-8-1-4 XAudioStatus类型](#xapi-3-8-1-4)
            * [3-8-1-5 xapi\_AudioEnumDevices();](#xapi-3-8-1-5)
            * [3-8-1-6 xapi\_AudioGetDeviceInfo();](#xapi-3-8-1-6)
            * [3-8-1-7 xapi\_AudioGetDeviceSettings();](#xapi-3-8-1-7)
            * [3-8-1-8 xapi\_AudioSetDeviceSettings();](#xapi-3-8-1-8)
            * [3-8-1-9 xapi\_AudioOpen();](#xapi-3-8-1-9)
            * [3-8-1-10 xapi\_AudioWrite();](#xapi-3-8-1-10)
            * [3-8-1-11 xapi\_AudioRead();](#xapi-3-8-1-11)
            * [3-8-1-12 xapi\_AudioControl();](#xapi-3-8-1-12)
            * [3-8-1-13 xapi\_AudioQuery();](#xapi-3-8-1-13)
            * [3-8-1-14 xapi\_AudioWait();](#xapi-3-8-1-14)
            * [3-8-1-15 xapi\_AudioSetVolume();](#xapi-3-8-1-15)
            * [3-8-1-16 xapi\_AudioSetMute();](#xapi-3-8-1-16)
            * [3-8-1-17 xapi\_AudioClose();](#xapi-3-8-1-17)
        * [3-8-2 音频播放](#xapi-3-8-2)
            * [3-8-2-1 XAudioPlayerStatus类型](#xapi-3-8-2-1)
            * [3-8-2-2 xapi\_AudioPlayerOpen();](#xapi-3-8-2-2)
            * [3-8-2-3 xapi\_AudioPlayerPlay();](#xapi-3-8-2-3)
            * [3-8-2-4 xapi\_AudioPlayerPause();](#xapi-3-8-2-4)
            * [3-8-2-5 xapi\_AudioPlayerStop();](#xapi-3-8-2-5)
            * [3-8-2-6 xapi\_AudioPlayerSeek();](#xapi-3-8-2-6)
            * [3-8-2-7 xapi\_AudioPlayerQuery();](#xapi-3-8-2-7)
            * [3-8-2-8 xapi\_AudioPlayerSetVolume();](#xapi-3-8-2-8)
            * [3-8-2-9 xapi\_AudioPlayerClose();](#xapi-3-8-2-9)
        * [3-8-3 MP3解码](#xapi-3-8-3)
            * [3-8-3-1 XMp3Info类型](#xapi-3-8-3-1)
            * [3-8-3-2 xapi\_Mp3DecoderOpenFile();](#xapi-3-8-3-2)
            * [3-8-3-3 xapi\_Mp3DecoderOpenMemory();](#xapi-3-8-3-3)
            * [3-8-3-4 xapi\_Mp3DecoderGetInfo();](#xapi-3-8-3-4)
            * [3-8-3-5 xapi\_Mp3DecoderReadPCM();](#xapi-3-8-3-5)
            * [3-8-3-6 xapi\_Mp3DecoderSeek();](#xapi-3-8-3-6)
            * [3-8-3-7 xapi\_Mp3DecoderClose();](#xapi-3-8-3-7)
    * [3-9 权限](#xapi-3-9)
        * [3-9-1 UserPermisson类型](#xapi-3-9-1)
        * [3-9-2 xapi\_QueryFileAccess();](#xapi-3-9-2)
        * [3-9-3 xapi\_RequestFileAccess();](#xapi-3-9-3)
        * [3-9-4 xapi\_RequestSpecialPermission();](#xapi-3-9-4)
        * [3-9-5 xapi\_LiftPermissions();](#xapi-3-9-5)
        * [3-9-6 xapi\_GetCurrentPermissions();](#xapi-3-9-6)
        * [3-9-7 xapiRequestPermissions();](#xapi-3-9-7)
    * [3-10 标记文本解析](#xapi-3-10)
        * [3-10-1 XML](#xapi-3-10-1)
            * [3-10-1-1 XXmlAttribute类型](#xapi-3-10-1-1)
            * [3-10-1-2 XXmlNode类型](#xapi-3-10-1-2)
            * [3-10-1-3 XXmlTree类型](#xapi-3-10-1-3)
            * [3-10-1-4 xapi\_parseXml();](#xapi-3-10-1-4)
            * [3-10-1-5 xapi\_freeXmlNode();](#xapi-3-10-1-5)
            * [3-10-1-6 xapi\_freeXmlTree();](#xapi-3-10-1-6)
        * [3-10-2 JSON](#xapi-3-10-2)
            * [3-10-2-1 XJsonObjectEntry类型](#xapi-3-10-2-1)
            * [3-10-2-2 XJsonValue类型](#xapi-3-10-2-2)
            * [3-10-2-3 XJsonDocument类型](#xapi-3-10-2-3)
            * [3-10-2-4 xapi\_parseJson();](#xapi-3-10-2-4)
            * [3-10-2-5 xapi\_freeJsonValue();](#xapi-3-10-2-5)
            * [3-10-2-6 xapi\_freeJsonDocument();](#xapi-3-10-2-6)
            * [3-10-2-7 xapi\_jsonObjectGet();](#xapi-3-10-2-7)
            * [3-10-2-8 xapi\_jsonArraySize();](#xapi-3-10-2-8)
            * [3-10-2-9 xapi\_jsonArrayAt();](#xapi-3-10-2-9)
* [CHAPTER 4 – XJ380 API (XAPI GUI版)](#xapi-4)
    * [4-1 创建图形化应用程序](#xapi-4-1)
        * [4-1-1 XWINDOW类型](#xapi-4-1-1)
        * [4-1-2 xapi\_CreateWindow();](#xapi-4-1-2)
        * [4-1-3 xapi\_SetWindowTitle();](#xapi-4-1-3)
        * [4-1-4 xapi\_CloseWindow();](#xapi-4-1-4)
        * [4-1-5 xapi\_SetIcon();](#xapi-4-1-5)
        * [4-1-6 xapi\_GetWindowSize();](#xapi-4-1-6)
    * [4-2 绘图](#xapi-4-2)
        * [4-2-1 xapi\_DrawPoint();](#xapi-4-2-1)
        * [4-2-2 xapi\_DrawLine();](#xapi-4-2-2)
        * [4-2-3 xapi\_DrawRect();](#xapi-4-2-3)
        * [4-2-4 统一绘制事务](#xapi-4-2-4)
            * [4-2-4-1 XPaintControl类型](#xapi-4-2-4-1)
            * [4-2-4-2 xapi\_BeginPaint();](#xapi-4-2-4-2)
            * [4-2-4-3 xapi\_EndPaint();](#xapi-4-2-4-3)
            * [4-2-4-4 xapi\_CancelPaint();](#xapi-4-2-4-4)
            * [4-2-4-5 xapi\_PaintControls();](#xapi-4-2-4-5)
        * [4-2-5 文字](#xapi-4-2-5)
            * [4-2-5-1 XTextStyle类型](#xapi-4-2-5-1)
            * [4-2-5-2 XTextMetrics类型](#xapi-4-2-5-2)
            * [4-2-5-3 XTextRect类型](#xapi-4-2-5-3)
            * [4-2-5-4 xapi\_DrawText();](#xapi-4-2-5-4)
            * [4-2-5-5 xapi\_DrawTextl();](#xapi-4-2-5-5)
            * [4-2-5-6 xapi\_DrawSWText();](#xapi-4-2-5-6)
            * [4-2-5-7 xapi\_CalcTextWidth();](#xapi-4-2-5-7)
            * [4-2-5-8 xapi\_GetTextMetrics();](#xapi-4-2-5-8)
            * [4-2-5-9 xapi\_GetTextPosition();](#xapi-4-2-5-9)
            * [4-2-5-10 xapi\_DrawTextEx();](#xapi-4-2-5-10)
            * [4-2-5-11 xapi\_DrawTextBaseline();](#xapi-4-2-5-11)
            * [4-2-5-12 xapi\_DrawTextTop();](#xapi-4-2-5-12)
            * [4-2-5-13 xapi\_DrawMonoTextTop();](#xapi-4-2-5-13)
            * [4-2-5-14 xapi\_DrawTextInRect();](#xapi-4-2-5-14)
        * [4-2-6 xapi\_DrawSvg();](#xapi-4-2-6)
        * [4-2-7 xapi\_DrawFA();](#xapi-4-2-7)
    * [4-3 插入图片](#xapi-4-3)
        * [4-3-1 XCOLORA类型](#xapi-4-3-1)
        * [4-3-2 xapi\_DrawBMP();](#xapi-4-3-2)
        * [4-3-3 xapi\_DrawPNG();](#xapi-4-3-3)
        * [4-3-4 xapi\_DrawPicture();](#xapi-4-3-4)
        * [4-3-5 xapi\_GetPicSize();](#xapi-4-3-5)
        * [4-3-6 xapi\_LoadPicture();](#xapi-4-3-6)
    * [4-4 消息处理](#xapi-4-4)
        * [4-4-1 消息处理函数](#xapi-4-4-1)
        * [4-4-2 键盘消息](#xapi-4-4-2)
            * [4-4-2-1 CHAR消息](#xapi-4-4-2-1)
            * [4-4-2-2 SPCHAR消息](#xapi-4-4-2-2)
            * [4-4-2-3 KEYDOWN消息](#xapi-4-4-2-3)
            * [4-4-2-4 KEYUP消息](#xapi-4-4-2-4)
            * [4-4-2-5 KEYLONGPRESS消息](#xapi-4-4-2-5)
        * [4-4-3 鼠标消息](#xapi-4-4-3)
            * [4-4-3-1 MOVE消息](#xapi-4-4-3-1)
            * [4-4-3-2 LBUTTON消息](#xapi-4-4-3-2)
            * [4-4-3-3 RBUTTON消息](#xapi-4-4-3-3)
            * [4-4-3-4 MBUTTON消息](#xapi-4-4-3-4)
            * [4-4-3-5 LBUTTON\_PRESS消息](#xapi-4-4-3-5)
            * [4-4-3-6 RBUTTON\_PRESS消息](#xapi-4-4-3-6)
            * [4-4-3-7 MBUTTON\_PRESS消息](#xapi-4-4-3-7)
            * [4-4-3-8 ROLLER消息](#xapi-4-4-3-8)
            * [4-4-3-9 LBUTTONUP消息](#xapi-4-4-3-9)
        * [4-4-4 控件消息](#xapi-4-4-4)
        * [4-4-5 刷新消息](#xapi-4-4-5)
        * [4-4-6 动画消息](#xapi-4-4-6)
        * [4-4-7 剪切板消息](#xapi-4-4-7)
            * [4-4-7-1 PASTE消息](#xapi-4-4-7-1)
            * [4-4-7-2 EDIT消息](#xapi-4-4-7-2)
    * [4-5 对framebuffer进行操作](#xapi-4-5)
        * [4-5-1 XCOLOR类型](#xapi-4-5-1)
        * [4-5-2 xapi\_ReadBuffer();](#xapi-4-5-2)
        * [4-5-3 xapi\_WriteBuffer();](#xapi-4-5-3)
        * [4-5-4 xapi\_ReadBufferA();](#xapi-4-5-4)
        * [4-5-5 xapi\_WriteBufferA();](#xapi-4-5-5)
        * [4-5-6 xapi\_RefreshWindow();](#xapi-4-5-6)
        * [4-5-7 xapi\_RefreshPartWindow();](#xapi-4-5-7)
    * [4-6 控件](#xapi-4-6)
        * [4-6-1 按钮控件](#xapi-4-6-1)
            * [4-6-1-1 xapi\_Button();](#xapi-4-6-1-1)
            * [4-6-1-2 xapi\_ButtonEmp();](#xapi-4-6-1-2)
            * [4-6-1-3 xapi\_DeleteButton();](#xapi-4-6-1-3)
        * [4-6-2 右键菜单控件](#xapi-4-6-2)
            * [4-6-2-1 RightMenuItem类型](#xapi-4-6-2-1)
            * [4-6-2-2 xapi\_RegisterRightButtonMenu();](#xapi-4-6-2-2)
            * [4-6-2-3 xapi\_DeleteRightButtonMenu();](#xapi-4-6-2-3)
        * [4-6-3 文本输入框控件](#xapi-4-6-3)
            * [4-6-3-1 xapi\_PutTextInputBox();](#xapi-4-6-3-1)
            * [4-6-3-2 xapi\_GetTextInputBox();](#xapi-4-6-3-2)
            * [4-6-3-3 xapi\_DeleteTextInputBox();](#xapi-4-6-3-3)
        * [4-6-4 单模开关控件](#xapi-4-6-4)
            * [4-6-4-1 xapi\_PutSwitch();](#xapi-4-6-4-1)
            * [4-6-4-2 xapi\_SetSwitch();](#xapi-4-6-4-2)
            * [4-6-4-3 xapi\_DeleteSwitch();](#xapi-4-6-4-3)
        * [4-6-5 滚动条](#xapi-4-6-5)
            * [4-6-5-1 xapi\_PutVerticalScrollBar();](#xapi-4-6-5-1)
            * [4-6-5-2 xapi\_PutHorizontalScrollBar();](#xapi-4-6-5-2)
            * [4-6-5-3 xapi\_DeleteScrollBar();](#xapi-4-6-5-3)
            * [4-6-5-4 xapi\_SetScrollBarPosition();](#xapi-4-6-5-4)
    * [4-7 动画](#xapi-4-7)
        * [4-7-1 XAnimCurve类型](#xapi-4-7-1)
        * [4-7-2 XAnimDesc类型](#xapi-4-7-2)
        * [4-7-3 XAnimSnapshot类型](#xapi-4-7-3)
        * [4-7-4 xapi\_AnimationStart();](#xapi-4-7-4)
        * [4-7-5 xapi\_AnimationControl();](#xapi-4-7-5)
        * [4-7-6 xapi\_AnimationQuery();](#xapi-4-7-6)
        * [4-7-7 xapi\_AnimationRelease();](#xapi-4-7-7)
    * [4-8 剪切板和文本选择](#xapi-4-8)
        * [4-8-1 XClipData类型](#xapi-4-8-1)
        * [4-8-2 XClipOffer类型](#xapi-4-8-2)
        * [4-8-3 XClipImage类型](#xapi-4-8-3)
        * [4-8-4 XClipFiles类型](#xapi-4-8-4)
        * [4-8-5 XClipPath类型](#xapi-4-8-5)
        * [4-8-6 XClipFormat类型](#xapi-4-8-6)
        * [4-8-7 XClipInfo类型](#xapi-4-8-7)
        * [4-8-8 XTextSelection类型](#xapi-4-8-8)
        * [4-8-9 xapi\_ClipboardSetText();](#xapi-4-8-9)
        * [4-8-10 xapi\_ClipboardSetData();](#xapi-4-8-10)
        * [4-8-11 xapi\_ClipboardQuery();](#xapi-4-8-11)
        * [4-8-12 xapi\_ClipboardAttach();](#xapi-4-8-12)
        * [4-8-13 xapi\_RequestPaste();](#xapi-4-8-13)
        * [4-8-14 xapi\_GetPasteInfo();](#xapi-4-8-14)
        * [4-8-15 xapi\_ReadPaste();](#xapi-4-8-15)
        * [4-8-16 xapi\_FinishPaste();](#xapi-4-8-16)
        * [4-8-17 xapi\_ClipboardClaimMove();](#xapi-4-8-17)
        * [4-8-18 xapi\_TextInputGetSelection();](#xapi-4-8-18)
        * [4-8-19 xapi\_TextInputSetSelection();](#xapi-4-8-19)
        * [4-8-20 xapi\_TextInputSetFlags();](#xapi-4-8-20)
    * [4-9 输入法](#xapi-4-9)
        * [4-9-1 XImeRegistration类型](#xapi-4-9-1)
        * [4-9-2 XImeInfo类型](#xapi-4-9-2)
        * [4-9-3 XImeList类型](#xapi-4-9-3)
        * [4-9-4 XImeState类型](#xapi-4-9-4)
        * [4-9-5 XImeSelect类型](#xapi-4-9-5)
        * [4-9-6 XImeSession类型](#xapi-4-9-6)
        * [4-9-7 XImeEvent类型](#xapi-4-9-7)
        * [4-9-8 XImeReply类型](#xapi-4-9-8)
        * [4-9-9 XImeUi类型](#xapi-4-9-9)
        * [4-9-10 XImeMode类型](#xapi-4-9-10)
        * [4-9-11 XImeContext类型](#xapi-4-9-11)
        * [4-9-12 XImeSessionV2类型](#xapi-4-9-12)
        * [4-9-13 XImeEventV2类型](#xapi-4-9-13)
        * [4-9-14 XImeReplyV2类型](#xapi-4-9-14)
        * [4-9-15 XImeUiV2类型](#xapi-4-9-15)
        * [4-9-16 XImeUserData类型](#xapi-4-9-16)
        * [4-9-17 xapi\_ImeRegister();](#xapi-4-9-17)
        * [4-9-18 xapi\_ImeEnum();](#xapi-4-9-18)
        * [4-9-19 xapi\_ImeGetState();](#xapi-4-9-19)
        * [4-9-20 xapi\_ImeSetActive();](#xapi-4-9-20)
        * [4-9-21 xapi\_ImeUnregister();](#xapi-4-9-21)
        * [4-9-22 xapi\_ImeAttach();](#xapi-4-9-22)
        * [4-9-23 xapi\_ImeGetEvent();](#xapi-4-9-23)
        * [4-9-24 xapi\_ImeReplyEvent();](#xapi-4-9-24)
        * [4-9-25 xapi\_ImeUpdateUi();](#xapi-4-9-25)
        * [4-9-26 xapi\_ImeSetMode();](#xapi-4-9-26)
        * [4-9-27 xapi\_ImeSetContext();](#xapi-4-9-27)
        * [4-9-28 xapi\_ImeAttachV2();](#xapi-4-9-28)
        * [4-9-29 xapi\_ImeGetEventV2();](#xapi-4-9-29)
        * [4-9-30 xapi\_ImeReplyEventV2();](#xapi-4-9-30)
        * [4-9-31 xapi\_ImeUpdateUiV2();](#xapi-4-9-31)
        * [4-9-32 xapi\_ImeUserData();](#xapi-4-9-32)
    * [4-10 截屏](#xapi-4-10)
        * [4-10-1 xapi\_CaptureScreen();](#xapi-4-10-1)
        * [4-10-2 xapi\_SetSecret();](#xapi-4-10-2)
    * [4-11 通知和重点](#xapi-4-11)
        * [4-11-1 XApiNotificationRequest类型](#xapi-4-11-1)
        * [4-11-2 xapi\_SendAppMessage();](#xapi-4-11-2)
        * [4-11-3 xapi\_SetNotifyPrcor();](#xapi-4-11-3)
        * [4-11-4 xapi\_SendNotification();](#xapi-4-11-4)
        * [4-11-5 xapi\_HighlightNotice();](#xapi-4-11-5)
* [CHAPTER 5 – XJ380 API (XAPI网络版)](#xapi-5)
    * [5-1 XNet原生网络](#xapi-5-1)
        * [5-1-1 XNetCapabilities类型](#xapi-5-1-1)
        * [5-1-2 XNetAddress类型](#xapi-5-1-2)
        * [5-1-3 XNetOpenDesc类型](#xapi-5-1-3)
        * [5-1-4 XNetEndpoint类型](#xapi-5-1-4)
        * [5-1-5 XNetIoOptions类型](#xapi-5-1-5)
        * [5-1-6 XNetDatagramInfo类型](#xapi-5-1-6)
        * [5-1-7 XNetSocketInfo类型](#xapi-5-1-7)
        * [5-1-8 XNetTcpOptions类型](#xapi-5-1-8)
        * [5-1-9 XNetUdpOptions类型](#xapi-5-1-9)
        * [5-1-10 XNetWaitItem类型](#xapi-5-1-10)
        * [5-1-11 xapi\_NetGetCapabilities();](#xapi-5-1-11)
        * [5-1-12 xapi\_NetParseAddress();](#xapi-5-1-12)
        * [5-1-13 xapi\_NetFormatAddress();](#xapi-5-1-13)
        * [5-1-14 xapi\_NetOpen();](#xapi-5-1-14)
        * [5-1-15 xapi\_NetBind();](#xapi-5-1-15)
        * [5-1-16 xapi\_NetListen();](#xapi-5-1-16)
        * [5-1-17 xapi\_NetAccept();](#xapi-5-1-17)
        * [5-1-18 xapi\_NetConnect();](#xapi-5-1-18)
        * [5-1-19 xapi\_NetSend();](#xapi-5-1-19)
        * [5-1-20 xapi\_NetReceive();](#xapi-5-1-20)
        * [5-1-21 xapi\_NetSendTo();](#xapi-5-1-21)
        * [5-1-22 xapi\_NetReceiveFrom();](#xapi-5-1-22)
        * [5-1-23 xapi\_NetSendAll();](#xapi-5-1-23)
        * [5-1-24 xapi\_NetShutdown();](#xapi-5-1-24)
        * [5-1-25 xapi\_NetQuery();](#xapi-5-1-25)
        * [5-1-26 xapi\_NetSetTcpOptions();](#xapi-5-1-26)
        * [5-1-27 xapi\_NetGetTcpOptions();](#xapi-5-1-27)
        * [5-1-28 xapi\_NetSetUdpOptions();](#xapi-5-1-28)
        * [5-1-29 xapi\_NetGetUdpOptions();](#xapi-5-1-29)
        * [5-1-30 xapi\_NetClose();](#xapi-5-1-30)
        * [5-1-31 xapi\_NetWaitMany();](#xapi-5-1-31)
        * [5-1-32 xapi\_NetCreateCancel();](#xapi-5-1-32)
        * [5-1-33 xapi\_NetSignalCancel();](#xapi-5-1-33)
    * [5-2 DNS与配置](#xapi-5-2)
        * [5-2-1 XNetResolveDesc类型](#xapi-5-2-1)
        * [5-2-2 XNetInterfaceInfo类型](#xapi-5-2-2)
        * [5-2-3 XNetInterfaceAddress类型](#xapi-5-2-3)
        * [5-2-4 XNetDnsConfig类型](#xapi-5-2-4)
        * [5-2-5 XNetInterfaceConfig类型](#xapi-5-2-5)
        * [5-2-6 XNetSavedConfig类型](#xapi-5-2-6)
        * [5-2-7 XNetConfigStatus类型](#xapi-5-2-7)
        * [5-2-8 XNetChange类型](#xapi-5-2-8)
        * [5-2-9 xapi\_NetResolveStart();](#xapi-5-2-9)
        * [5-2-10 xapi\_NetResolveGetResult();](#xapi-5-2-10)
        * [5-2-11 xapi\_NetEnumInterfaces();](#xapi-5-2-11)
        * [5-2-12 xapi\_NetGetInterfaceInfo();](#xapi-5-2-12)
        * [5-2-13 xapi\_NetGetInterfaceAddresses();](#xapi-5-2-13)
        * [5-2-14 xapi\_NetGetDnsConfig();](#xapi-5-2-14)
        * [5-2-15 xapi\_NetApplyInterfaceConfig();](#xapi-5-2-15)
        * [5-2-16 xapi\_NetApplyDnsConfig();](#xapi-5-2-16)
        * [5-2-17 xapi\_NetGetSavedConfig();](#xapi-5-2-17)
        * [5-2-18 xapi\_NetSaveConfig();](#xapi-5-2-18)
        * [5-2-19 xapi\_NetReloadConfig();](#xapi-5-2-19)
        * [5-2-20 xapi\_NetGetConfigStatus();](#xapi-5-2-20)
        * [5-2-21 xapi\_NetWatchCreate();](#xapi-5-2-21)
        * [5-2-22 xapi\_NetWatchRead();](#xapi-5-2-22)
    * [5-3 TLS](#xapi-5-3)
        * [5-3-1 XTlsConnectDesc类型](#xapi-5-3-1)
        * [5-3-2 XTlsPeerInfo类型](#xapi-5-3-2)
        * [5-3-3 xapi\_TlsConnectStart();](#xapi-5-3-3)
        * [5-3-4 xapi\_TlsWait();](#xapi-5-3-4)
        * [5-3-5 xapi\_TlsGetPeerInfo();](#xapi-5-3-5)
        * [5-3-6 xapi\_TlsSend();](#xapi-5-3-6)
        * [5-3-7 xapi\_TlsReceive();](#xapi-5-3-7)
        * [5-3-8 xapi\_TlsShutdown();](#xapi-5-3-8)
        * [5-3-9 xapi\_TlsCancel();](#xapi-5-3-9)
        * [5-3-10 xapi\_TlsClose();](#xapi-5-3-10)
    * [5-4 HTTP](#xapi-5-4)
        * [5-4-1 XHttpHeader类型](#xapi-5-4-1)
        * [5-4-2 XHttpRequestDesc类型](#xapi-5-4-2)
        * [5-4-3 XHttpResponseInfo类型](#xapi-5-4-3)
        * [5-4-4 xapi\_HttpRequestStart();](#xapi-5-4-4)
        * [5-4-5 xapi\_HttpWait();](#xapi-5-4-5)
        * [5-4-6 xapi\_HttpGetResponseInfo();](#xapi-5-4-6)
        * [5-4-7 xapi\_HttpGetTlsInfo();](#xapi-5-4-7)
        * [5-4-8 xapi\_HttpGetHeader();](#xapi-5-4-8)
        * [5-4-9 xapi\_HttpRead();](#xapi-5-4-9)
        * [5-4-10 xapi\_HttpCancel();](#xapi-5-4-10)
        * [5-4-11 xapi\_HttpClose();](#xapi-5-4-11)
        * [5-4-12 xapi\_HttpCloseIdleConnections();](#xapi-5-4-12)
        * [5-4-13 xapi\_httpGet();](#xapi-5-4-13)
* [CHAPTER 6 – BridgeEngine API](#xapi-6)
    * [6-1 简介](#xapi-6-1)
* [CHAPTER 7 – Stardust UI](#xapi-7)
    * [7-1 简介](#xapi-7-1)

<a id="xapi-1"></a>

# CHAPTER 1 – 关于、编译和专有类型

**ABOUT, COMPILE AND EXCLUSIVE TYPE**

本章节将会介绍本篇手册以及XJ380 API的相关信息、如何编译为XJ380应用程序（EPF）以及本手册内的所有专有类型。

<a id="xapi-1-1"></a>

## 1-1 关于

XJ380 API由3（或4）部分组成：兼容POSIX的XJ380 API、XAPI版XJ380 API和带GUI的XAPI版XJ380 API（XJ380 Professional Edition或更高版本默认集成BrigeEngine引擎，可使用BAPI。详见BrigeEngine API标准文档）。**其中兼容POSIX的XJ380 API和XAPI版XJ380 API仅可创建控制台程序。带GUI的XAPI版XJ380 API和BrigeEngine** **BAPI可用于创建图形化应用程序**。这3（或4）种API可以混合使用。

<a id="xapi-1-2"></a>

## 1-2 编译为XJ380应用程序

您可以在 **https://www.xingjisoft.top/os/xj380/download<strong> 处下载XJ380应用程序编译套件，或使用SpaceCode系列编辑器进行编译（须安装额外模块）。</strong>请您仔细阅读套件中的配置指南并配置环境。<strong>您也可以自行链接XAPI库。</strong>请务必使用C++11或更高标准**，并编译为ELF/EPF格式。EPF格式编译套件已包含在XJ380应用程序编译套件中。

您需要引入下列头文件的其中至少一个：

| 头文件名 | 用途 |
| --- | --- |
| x3api.h | 引入所有XJ380 API（除BAPI）（建议使用） |
| xposix.h | 引入POSIX版XJ380 API |
| xguiapi.h | 引入XAPI（GUI版） |
| xtuiapi.h | 引入XAPI（无GUI版） |
| xapi.h | 引入所有XAPI（建议使用） |
| BridgeEngine.h | 引入所有BAPI |
| x4api.h | 引入所有XJ380 API |
| krlibc.h | 常用函数库 |
| xposix/\*.h | 部分C标准库 |

<a id="table-1-2-1"></a>

**表格1-2-1 头文件用途**

除bapi外，这些头文件均可以在XJ380应用程序编译套件中的include文件夹找到。bapi相关头文件可以在BridgeEngine开发套件中找到。

请您务必按照要求编写主函数。主函数格式如下：

**主函数格式**

```cpp
int  main(int  argc, char** argv, char** envp);
```

其中argv为传参数，envp为当前用户环境变量。

**编译为XJ380图形化应用程序（EPF版）**

&emsp;使用XJ380开发套件中的XXCC（XINGJI XJ380 C++ Compiler）进行编译和链接。编译参数与G++参数相同。由于XJ380程序的特殊性，我们只建议您使用-O、-g两种参数。

```sh
xxcc  [编译选项]  <源文件>  -o  <输出文件>
```

**编译为XJ380终端应用程序（EPF版）**

&emsp;使用XJ380开发套件中的XXCCTe（XINGJI XJ380 C++ Compiler Terminal Edition）进行编译和链接。编译参数与G++参数相同。由于XJ380程序的特殊性，我们只建议您使用-O、-g两种参数。

```sh
xxccte  [编译选项]  <源文件>  -o  <输出文件>
```

**使用XJ380编译套件编译为XJ380图形化应用程序（ELF版）**

&emsp;使用XJ380开发套件中的XXCC-elf（XINGJI XJ380 C++ Compiler）进行编译和链接。编译参数与G++参数相同。由于XJ380程序的特殊性，我们只建议您使用-O、-g两种参数。

```sh
xxcc-elf  [编译选项]  <源文件>  -o  <输出文件>
```

**使用XJ380编译套件编译为XJ380终端应用程序（ELF版）**

&emsp;使用XJ380开发套件中的XXCCTe-elf（XINGJI XJ380 C++ Compiler Terminal Edition）进行编译和链接。编译参数与G++参数相同。由于XJ380程序的特殊性，我们只建议您使用-O、-g两种参数。

```sh
xxccte-elf  [编译选项]  <源文件>  -o  <输出文件>
```

**使用其他编译器编译为XJ380应用程序（ELF版）**

&emsp;我们将会为您提供参数用于编译和连接。这里拿clang++和ld举例。

```sh
clang++ -ffreestanding -fno-builtin -m64 -std=c++11 -fno-stack-protector -fno-exceptions -fshort-wchar -nostdinc -c <源文件>  -o  <目标文件>  -D __XJ380_OS__
ld  -Ttext=0x200000  <所有XAPI TUI/GUI目标文件+目标文件>  -o  <输出文件>
```

&emsp;**使用其他编译器编译为XJ380应用程序（C语言版）**

&emsp;在C++版本上给前面加上—即可，如xxcc--。

如果您要编译为终端应用程序，请链接XAPI TUI目标文件；反之请链接XAPI GUI目标文件。两种XAPI目标文件已分别存放在编译套件中。（您可以根据需要对-std参数进行调整，但必须保证其高于11版）

<a id="xapi-1-3"></a>

## 1-3 专有类型概览

本节仅列出基础类型别名和回调函数类型。结构体的完整定义放在首次使用它的函数所在小节开头；枚举值及宏的名称、用途见对应函数下方的表格。

| 类型名称 | 长度（字节） | 概述 |
| --- | --- | --- |
| INT8 | 1 | 8位整数类型。 |
| UINT8 | 1 | 8位整数类型。 |
| INT16 | 2 | 16位整数类型。 |
| UINT16 | 2 | 16位整数类型。 |
| INT32 | 4 | 32位整数、标识或结果类型。 |
| UINT32 | 4 | 32位整数、标识或结果类型。 |
| INT64 | 8 | 64位整数、句柄或结果类型。 |
| UINT64 | 8 | 64位整数、句柄或结果类型。 |
| WSTR | 8 | 指向UTF-8字符串的char指针。 |
| HDLE | 8 | 不透明对象句柄，不可作为内核指针解引用。 |
| MsgPrcor | 8 | 回调函数指针。 |
| XApiNotifyPrcor | 8 | 回调函数指针。 |
| XAudioU32 | 4 | 32位整数、标识或结果类型。 |
| XAudioI32 | 4 | 32位整数、标识或结果类型。 |
| XAudioU64 | 8 | 64位整数、句柄或结果类型。 |
| XAudioHandle | 8 | 不透明对象句柄，不可作为内核指针解引用。 |
| XAudioResult | 8 | 接口结果类型；具体成功值和错误约定见各函数。 |
| XAudioPlayer | 8 | 不透明对象句柄，不可作为内核指针解引用。 |
| XMp3Handle | 8 | 不透明对象句柄，不可作为内核指针解引用。 |
| XMp3Result | 8 | 接口结果类型；具体成功值和错误约定见各函数。 |
| XAnimU32 | 4 | 32位整数、标识或结果类型。 |
| XAnimU64 | 8 | 64位整数、句柄或结果类型。 |
| XAnimI32 | 4 | 32位整数、标识或结果类型。 |
| XAnimHandle | 8 | 不透明对象句柄，不可作为内核指针解引用。 |
| XAnimResult | 8 | 接口结果类型；具体成功值和错误约定见各函数。 |
| XClipU32 | 4 | 32位整数、标识或结果类型。 |
| XClipU64 | 8 | 64位整数、句柄或结果类型。 |
| XClipResult | 8 | 接口结果类型；具体成功值和错误约定见各函数。 |
| XImeU32 | 4 | 32位整数、标识或结果类型。 |
| XImeU64 | 8 | 64位整数、句柄或结果类型。 |
| XImeI32 | 4 | 32位整数、标识或结果类型。 |
| XImeResult | 8 | 接口结果类型；具体成功值和错误约定见各函数。 |
| XHighlightStyle | 4 | 32位整数、标识或结果类型。 |
| XHighlightResult | 4 | 接口结果类型；具体成功值和错误约定见各函数。 |
| XNetHandle | 8 | 不透明对象句柄，不可作为内核指针解引用。 |
| XNetResult | 8 | 接口结果类型；具体成功值和错误约定见各函数。 |
| XNetInterfaceId | 4 | 32位整数、标识或结果类型。 |
| XTlsHandle | 8 | 不透明对象句柄，不可作为内核指针解引用。 |
| XHttpHandle | 8 | 不透明对象句柄，不可作为内核指针解引用。 |

<a id="table-1-3-1"></a>

**表格1-3-1 专有类型概览**

**类型声明**

```cpp
typedef int8_t INT8;
typedef uint8_t UINT8;
typedef int16_t INT16;
typedef uint16_t UINT16;
typedef int32_t INT32;
typedef uint32_t UINT32;
typedef int64_t INT64;
typedef uint64_t UINT64;
typedef char * WSTR;
typedef UINT64 HDLE;
typedef void (*MsgPrcor)(UINT64 Type, UINT64 hData, UINT64 lData);
typedef void (*XApiNotifyPrcor)(UINT64 notification_id,
    UINT64 action_id);
typedef unsigned int       XAudioU32;
typedef int                XAudioI32;
```

```cpp
typedef unsigned long long XAudioU64;
typedef unsigned long long XAudioHandle;
typedef long long          XAudioResult;
typedef XAudioU64 XAudioPlayer;
typedef XAudioU64 XMp3Handle;
typedef XAudioResult XMp3Result;
typedef unsigned int       XAnimU32;
typedef unsigned long long XAnimU64;
typedef int                XAnimI32;
typedef unsigned long long XAnimHandle;
typedef long long          XAnimResult;
typedef unsigned int       XClipU32;
typedef unsigned long long XClipU64;
typedef long long          XClipResult;
```

```cpp
typedef unsigned int       XImeU32;
typedef unsigned long long XImeU64;
typedef int                XImeI32;
typedef long long          XImeResult;
typedef unsigned int XHighlightStyle;
typedef int          XHighlightResult;
typedef uint64_t XNetHandle;
typedef int64_t  XNetResult;
typedef uint32_t XNetInterfaceId;
typedef uint64_t XTlsHandle;
typedef uint64_t XHttpHandle;
```

<a id="xapi-1-4"></a>

## 1-4 用户及权限

XJ380的用户共分为5类（见表格1-4-1）。权限共分为7类：读文件（R）、写文件（W）、更改设置（CS）、访问其他目录（NV）、访问系统目录（SV）、读系统文件（SR）、写系统文件（SW）。各类用户所拥有的权限及特权级请参见下表。

| 用户类别 | 特权级（x86） | R | W | CS | NV | SV | SR | SW |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Root | 0 | Y | Y | Y | Y | Y | Y | Y |
| System | 3 | Y | Y | Y | Y | Y | Y | Y |
| Admin | 3 | Y | Y | Y | Y | Y | N | N |
| Visitor | 3 | Y | Y | N | Y/N | N | N | N |
| Custom | 3 | - | - | - | - | - | - | - |

<a id="table-1-4-1"></a>

**表格1-4-1**

（Y为拥有该权限，N为无权限，-为由用户自定义，Y/N代表需要用户手动许可）

&emsp;其中相册等隐私文件夹（可以设置）只要不在应用程序文件夹下，访问时就必须会进行弹窗确认。用户可以在设置中手动关闭。

XJ380会默认创建一个Admin权限的用户（用户名和密码由用户自行设置），并且用户最高可通过输入密码（详细方法请见官方教程，System密码默认为114514，可通过设置更改）获取System权限。

没有访问其他目录权限的应用程序仅可访问其所正在运行的程序所在目录及其子目录，以及特殊目录（如/etc、/system/resources和当前用户的配置文件）。其中具有Admin权限的应用程序在访问其他目录时，系统会向用户发送一个访问请求，经用户手动输入密码并批准后，该程序才可访问其他目录。

系统目录包括 /system 和 /EFI 目录以及其所有子目录（除资源目录），这里面的所有文件都一定是系统文件。

普通xapi\_Run和xapi\_RunArgs启动的新程序使用Visitor权限。fork、execve及xapi\_SpawnInherited按各自约定保留调用者身份和权限；详情见进程与运行章节。

提升、请求权限请见3.9节 权限。

<a id="xapi-1-5"></a>

## 1-5 辨别XJ380环境

XXCC 2026v2或更高版本在编译时会自动定义一个名为\_\_XJ380\_OS\_\_的宏。

<a id="xapi-1-6"></a>

## 1-6 配置文件存放规范

/config是系统根文件系统中的普通目录，用于原生XJ380全局配置。组件应使用/config/&lt;组件名&gt;/子目录；用户偏好放在用户目录，日志、缓存和临时数据不放在/config。/etc保留给POSIX兼容和软件包配置；已有/system/config路径不会自动迁移或产生别名。

<a id="xapi-1-7"></a>

## 1-7 读取和修改设置

XJ380的系统设置会存放在/users/&lt;用户名&gt;/settings.json。修改系统设置时用户会在重点栏收到通知。设置采用JSON格式储存，各键对应选项为：

| 键名 | 用途 |
| --- | --- |
| background | 桌面背景图片路径。 |
| ctrlmenu\_background | 控制中心背景图片路径。 |
| timezone\_minutes | 时区偏移，单位分钟。 |
| timezone | 旧版整小时时区值；兼容读取时使用。 |
| language | 界面语言编号。 |
| memory\_mb | 设置界面保存的内存数值，单位MB。 |
| show\_hardware\_usage | 是否显示硬件使用情况。 |
| wheel\_reverse | 是否反转鼠标滚轮方向。 |
| keyboard\_layout | 键盘布局编号，默认US。 |
| keyboard\_repeat\_rate | 键盘重复率，单位Hz。 |
| keyboard\_repeat\_delay | 键盘重复延迟，单位毫秒。 |
| keyboard\_long\_press | 长按判定时间，单位毫秒。 |
| mouse\_pointer\_speed | 鼠标指针速度百分比。 |
| mouse\_double\_click | 双击最大间隔，单位毫秒；默认500，有效范围100至2000。 |
| dark\_mode | 深色模式偏好，默认false；当前保存此偏好但不改变系统配色。 |

<a id="table-1-7-1"></a>

**表格1-7-1 常用设置键**

缺少的键由读取方使用默认值。修改时应保留不认识的键，并遵守文件访问权限；写入文件不等于所有组件已经立即重新加载设置。

<a id="xapi-2"></a>

# CHAPTER 2 – XJ380 API (POSIX版)

**XJ380 API (POSIX EDITION)**

XJ380 API（POSIX版）遵守且兼容一部分POSIX标准。

<a id="xapi-2-1"></a>

## 2-1 简介

&emsp;XJ380 API（POSIX版）是遵守POSIX标准的API。

<a id="xapi-3"></a>

# CHAPTER 3 – XJ380 API (XAPI版)

**XJ380 API (XAPI EDITION)**

**XJ380 API（XAPI版）是由XINGJI Interactive Software自主设计的API标准**。所有XAPI均向下兼容低版本。3-3中的类型转换函数严格意义上并不算做API，但作为XAPI提供的一部分仍被写在这里。

<a id="xapi-3-1"></a>

## 3-1 文本输入输出

<a id="xapi-3-1-1"></a>

### 3-1-1 xapi\_Output();

该函数将会向控制台输出一段字符串。

**函数参数**

```cpp
void xapi_Output(WSTR str);
```

&emsp;**str** &emsp;将要输出的字符串。

返回值 &emsp;无。

<a id="xapi-3-1-2"></a>

### 3-1-2 xapi\_Input();

该函数将会从控制台读取文本直到回车。当前实现使用整行读取路径，输入中的空格会被保留。

**函数参数**

```cpp
void xapi_Input(WSTR str);
```

&emsp;**str** &emsp;用于接收输入文本的可写缓冲区，至少1024字节。

返回值 &emsp;无。

当前实现与整行输入共用读取路径，保留空格；请提供至少1024字节的可写缓冲区。

<a id="xapi-3-1-3"></a>

### 3-1-3 xapi\_Getline();

该函数将会从控制台读取一整行文本，直到用户按下回车。空格会保留，返回的字符串不包含行尾换行符。

**函数参数**

```cpp
void xapi_Getline(WSTR str);
```

&emsp;**str** &emsp;用于接收输入文本的可写缓冲区，至少1024字节。

返回值 &emsp;无。

str必须指向至少XAPI\_GETLINE\_BUFFER\_SIZE字节的可写缓冲区。最多保存1023字节及结尾的空字符；超长行会被截断，但仍读取到本行结束。该兼容接口不提供容量参数或错误返回值。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_GETLINE\_BUFFER\_SIZE | 1024U | 整行输入缓冲区容量，包含结尾空字符。 |

<a id="table-3-1-3-1"></a>

**表格3-1-3-1 整行输入缓冲区**

<a id="xapi-3-1-4"></a>

### 3-1-4 xapi\_Getch();

该函数将会从控制台读取字符。在读取到字符前不会继续执行。

**函数参数**

```cpp
char xapi_Getch(void);
```

返回值 &emsp;获取的字符。

<a id="xapi-3-1-5"></a>

### 3-1-5 xapi\_EndLine();

该函数将会向控制台输出换行。

**函数参数**

```cpp
void xapi_EndLine(void);
```

返回值 &emsp;无。

<a id="xapi-3-1-6"></a>

### 3-1-6 xapi\_PrintLine();

该函数将会向控制台输出一段字符串并换行。

**函数参数**

```cpp
void xapi_PrintLine(WSTR str);
```

&emsp;**str** &emsp;将要输出的字符串。

返回值 &emsp;无。

<a id="xapi-3-1-7"></a>

### 3-1-7 xapi\_Printf();

与C/C++标准内的printf用法相同。

**函数参数**

```cpp
void xapi_Printf(WSTR fmt, ...);
```

&emsp;**fmt** &emsp;格式字符串，可变参数应与格式说明对应。

&emsp;... &emsp;与格式字符串对应的可变参数。

返回值 &emsp;无。

<a id="xapi-3-1-8"></a>

### 3-1-8 xapi\_OutputSerial();

该函数将会向该电脑的串行端口输出一段字符串。

**函数参数**

```cpp
void xapi_OutputSerial(WSTR str);
```

&emsp;**str** &emsp;将要输出的字符串。

返回值 &emsp;无。

<a id="xapi-3-2"></a>

## 3-2 文件操作

<a id="xapi-3-2-1"></a>

### 3-2-1 XFILE类型

该类型用于存储读取到内存中的文件内容。

**类型结构**

```cpp
typedef struct {
    UINT64  length;
    void*   buffer;
} XFILE;
```

&emsp;**length** &emsp;数据长度。

<a id="xapi-3-2-2"></a>

### 3-2-2 xapi\_OpenFile();

该函数将会打开文件并读取。

**函数参数**

```cpp
XFILE * xapi_OpenFile(WSTR path);
```

&emsp;**path** &emsp;文件或目录的路径。

返回值 &emsp;指向XFILE类型结构体的指针。如果执行后为NULL则代表读取失败。

<a id="xapi-3-2-3"></a>

### 3-2-3 xapi\_CloseFile();

该函数将会将传入结构体的内容释放。该操作不会修改文件内容。

**函数参数**

```cpp
void xapi_CloseFile(XFILE* fsptr);
```

&emsp;**fsptr** &emsp;指向XFILE类型结构体的指针。执行后会被设置为空指针。 结构见3-2-1。

返回值 &emsp;无。

<a id="xapi-3-2-4"></a>

### 3-2-4 目录搜索

<a id="xapi-3-2-4-1"></a>

#### 3-2-4-1 DirNode类型

该类型用于存储目录中的文件或子目录条目。

**类型结构**

```cpp
typedef struct {
    char     filename[256];
    UINT64   length;
    UINT64   filetype;
}  DirNode;
```

&emsp;**filename** &emsp;文件或目录名称。

&emsp;**length** &emsp;数据长度。

&emsp;**filetype** &emsp;文件类别，0为文件，1为目录。

<a id="xapi-3-2-4-2"></a>

#### 3-2-4-2 xapi\_SearchFile();

该函数将会搜索指定目录下的所有文件/文件名称并返回。如果找不到指定路径，将会把count的值设置为-1。内存释放请见3-2-4-2

**函数参数**

```cpp
void xapi_SearchFile(WSTR path, INT32 *count, DirNode **dir);
```

&emsp;**path** &emsp;文件或目录的路径。

&emsp;**count** &emsp;条目数量。

&emsp;**dir** &emsp;目录条目数组的地址；搜索时用于接收数组，释放时传回取得的数组。 结构见3-2-4-1。

返回值 &emsp;无。

<a id="xapi-3-2-4-3"></a>

#### 3-2-4-3 xapi\_SearchFile\_freem();

该函数将会释放相关内存。

**函数参数**

```cpp
void xapi_SearchFile_freem(DirNode *dir, INT32 count);
```

&emsp;**dir** &emsp;目录条目数组的地址；搜索时用于接收数组，释放时传回取得的数组。 结构见3-2-4-1。

&emsp;**count** &emsp;条目数量。

返回值 &emsp;无。

<a id="xapi-3-2-5"></a>

### 3-2-5 xapi\_Mkdir();

该函数将会在指定目录下创建一个文件夹。

**函数参数**

```cpp
UINT64 xapi_Mkdir(WSTR path);
```

&emsp;**path** &emsp;文件或目录的路径。

返回值 &emsp;正常返回0，失败返回错误码

<a id="xapi-3-2-6"></a>

### 3-2-6 xapi\_CreateFile();

该函数将会在指定目录下创建一个文件。

**函数参数**

```cpp
UINT64 xapi_CreateFile(WSTR filename);
```

&emsp;**filename** &emsp;目标文件路径。

返回值 &emsp;正常返回0，失败返回错误码

<a id="xapi-3-2-7"></a>

### 3-2-7 xapi\_DeleteFile();

该函数将会删除指定文件。

**函数参数**

```cpp
UINT64 xapi_DeleteFile(WSTR path);
```

&emsp;**path** &emsp;文件或目录的路径。

返回值 &emsp;正常返回0，失败返回错误码

<a id="xapi-3-2-8"></a>

### 3-2-8 xapi\_RenameFile();

该函数将会重命名指定文件。

**函数参数**

```cpp
UINT64 xapi_RenameFile(WSTR old_path, WSTR new_path);
```

&emsp;**old\_path** &emsp;原路径。

&emsp;**new\_path** &emsp;新路径。

返回值 &emsp;正常返回0，失败返回错误码

<a id="xapi-3-2-9"></a>

### 3-2-9 xapi\_ReadFile();

该函数将会读取指定文件。

**函数参数**

```cpp
UINT64 xapi_ReadFile(
    WSTR filename,
    char *buffer,
    UINT64 size,
    UINT64 offset
);
```

&emsp;**filename** &emsp;目标文件路径。

&emsp;**buffer** &emsp;用于接收输出数据的可写缓冲区。

&emsp;**size** &emsp;文字大小；结构体字段中的**size**另有说明。

&emsp;**offset** &emsp;相对于文件开头的字节偏移。

返回值 &emsp;成功返回实际读取或写入的字节数，失败返回编码在UINT64中的负错误值。

<a id="xapi-3-2-10"></a>

### 3-2-10 xapi\_WriteFile();

该函数将会写入指定文件。

**函数参数**

```cpp
UINT64 xapi_WriteFile(
    WSTR filename,
    char *buffer,
    UINT64 size,
    UINT64 offset
);
```

&emsp;**filename** &emsp;目标文件路径。

&emsp;**buffer** &emsp;用于接收输出数据的可写缓冲区。

&emsp;**size** &emsp;文字大小；结构体字段中的**size**另有说明。

&emsp;**offset** &emsp;相对于文件开头的字节偏移。

返回值 &emsp;成功返回实际读取或写入的字节数，失败返回编码在UINT64中的负错误值。

<a id="xapi-3-2-11"></a>

### 3-2-11 xapi\_Rmdir();

该函数将会在删除指定文件夹。

**函数参数**

```cpp
UINT64 xapi_Rmdir(WSTR path);
```

&emsp;**path** &emsp;文件或目录的路径。

返回值 &emsp;正常返回0，失败返回错误码

<a id="xapi-3-2-12"></a>

### 3-2-12 xapi\_FileDialog();

该函数将会以打开或保存文件的理由，弹出对话框让用户选定路径。

**函数参数**

```cpp
UINT64 xapi_FileDialog(
    UINT64 mode,
    WSTR title,
    WSTR initial_path,
    char *out_path,
    UINT64 out_size
);
```

&emsp;**mode** &emsp;输入法语言模式结构体。

&emsp;**title** &emsp;对话框或通知标题。

&emsp;**initial\_path** &emsp;文件对话框的初始路径。

&emsp;**out\_path** &emsp;用于接收选择路径的字符缓冲区。

&emsp;**out\_size** &emsp;路径缓冲区容量，单位字节。

返回值 &emsp;正常返回0，失败返回错误码

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_FILE\_DIALOG\_OPEN | 0 | 选择需要打开的路径。 |
| XAPI\_FILE\_DIALOG\_SAVE | 1 | 选择需要保存的路径。 |

<a id="table-3-2-12-1"></a>

**表格3-2-12-1 XApiFileDialogMode**

<a id="xapi-3-3"></a>

## 3-3 类型转换

<a id="xapi-3-3-1"></a>

### 3-3-1 xcr\_char2int();

该函数将会把字符串转换为整型。

**函数参数**

```cpp
UINT64 xcr_char2int(WSTR str);
```

&emsp;**str** &emsp;字符串。

返回值 &emsp;整型。

<a id="xapi-3-3-2"></a>

### 3-3-2 xcr\_int2char();

该函数将会把整型转换为字符串。

**函数参数**

```cpp
WSTR xcr_int2char(UINT64 dec);
```

&emsp;**dec** &emsp;整型。

返回值 &emsp;字符串

<a id="xapi-3-3-3"></a>

### 3-3-3 xcr\_hex2char();

该函数将会把整型转换为16进制格式的字符串。

**函数参数**

```cpp
WSTR xcr_hex2char(UINT64 hex);
```

&emsp;**hex** &emsp;整型。

返回值 &emsp;字符串

<a id="xapi-3-3-4"></a>

### 3-3-4 toRGB();

该函数将会将3份数据（分别代表R G B）转换为32位整型（RGBA）格式。

**函数参数**

```cpp
UINT32 toRGB(UINT8 r, UINT8 g, UINT8 b);
```

&emsp;**r** &emsp;红、绿或蓝通道的数值，范围0至255。

&emsp;**g** &emsp;红、绿或蓝通道的数值，范围0至255。

&emsp;**b** &emsp;红、绿或蓝通道的数值，范围0至255。

**返回值** &emsp;RGBA格式的整型。

<a id="xapi-3-3-5"></a>

### 3-3-5 toRGBA();

该函数将会将32位整型格式（ARGB）转换为32位整型（RGBA）格式。

**函数参数**

```cpp
UINT32 toRGBA(UINT32 color);
```

&emsp;**color** &emsp;整型，格式为ARGB。

**返回值** &emsp;RGBA格式的整型。

<a id="xapi-3-4"></a>

## 3-4 进程与线程

<a id="xapi-3-4-1"></a>

### 3-4-1 XapiTaskInfo类型

该类型用于存储一个进程或线程的运行信息。

**类型结构**

```cpp
typedef struct
{
    UINT64 pid;
    UINT64 ppid;
    UINT64 tid;
    UINT64 cpu_id;
    UINT64 task_level;
    UINT64 thread_count;
    UINT64 window_count;
    UINT64 memory_bytes;
    UINT64 cpu_runtime_ticks;
    UINT32 process_status;
    UINT32 thread_status;
    char   process_name[XAPI_TASK_NAME_LEN];
    char   thread_name[XAPI_TASK_NAME_LEN];
} XapiTaskInfo;
```

&emsp;**pid** &emsp;进程ID、父进程ID或线程ID。

&emsp;**ppid** &emsp;进程ID、父进程ID或线程ID。

&emsp;**tid** &emsp;进程ID、父进程ID或线程ID。

&emsp;**cpu\_id** &emsp;CPU编号。

&emsp;**task\_level** &emsp;任务级别。

&emsp;**thread\_count** &emsp;线程数量或窗口数量。

&emsp;**window\_count** &emsp;线程数量或窗口数量。

&emsp;**memory\_bytes** &emsp;内存使用量，单位字节。

&emsp;**cpu\_runtime\_ticks** &emsp;任务累计CPU运行计数。

&emsp;**process\_status** &emsp;进程或线程状态值。

&emsp;**thread\_status** &emsp;进程或线程状态值。

&emsp;**process\_name** &emsp;进程或线程名称。

&emsp;**thread\_name** &emsp;进程或线程名称。

<a id="xapi-3-4-2"></a>

### 3-4-2 xapi\_Fork();

该函数会复制当前进程映像至新进程，子进程将从fork()后开始运行。

**函数参数**

```cpp
UINT64 xapi_Fork(void);
```

返回值 &emsp;父进程：子进程PID

<a id="xapi-3-4-3"></a>

### 3-4-3 xapi\_Execve();

该函数会使目的可执行文件替换当前进程映像。

**函数参数**

```cpp
UINT64 xapi_Execve(WSTR filename, WSTR argv[], WSTR envp[]);
```

&emsp;**filename** &emsp;可执行文件路径。

&emsp;**argv** &emsp;以空指针结束的命令行参数字符串数组。

&emsp;**envp** &emsp;以空指针结束的环境变量字符串数组。

返回值 &emsp;无：执行成功

<a id="xapi-3-4-4"></a>

### 3-4-4 xapi\_Exit();

该函数会退出当前线程。

**函数参数**

```cpp
void xapi_Exit(UINT64 value);
```

&emsp;**value** &emsp;返回值。

返回值 &emsp;无。

<a id="xapi-3-4-5"></a>

### 3-4-5 xapi\_GetTaskList();

该函数会获取操作系统当前任务调度列表。

**函数参数**

```cpp
UINT64 xapi_GetTaskList(XapiTaskInfo *buffer, UINT64 max_count);
```

&emsp;**buffer** &emsp;指向用于存储进程信息的指针。 结构见3-4-1。

&emsp;**max\_count** &emsp;最大条目数。

返回值 &emsp;返回实际写入buffer的任务条目数量。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_TASK\_NAME\_LEN | 32 | 任务名称数组容量。 |

<a id="table-3-4-5-1"></a>

**表格3-4-5-1 任务名称长度**

<a id="xapi-3-4-6"></a>

### 3-4-6 xapi\_KillProcess();

该函数会关闭指定进程（对于内核进程无效）。

**函数参数**

```cpp
UINT64 xapi_KillProcess(UINT64 pid);
```

&emsp;**pid** &emsp;进程ID。

返回值 &emsp;无

<a id="xapi-3-5"></a>

## 3-5 获取当前信息

<a id="xapi-3-5-1"></a>

### 3-5-1 UserInfo类型

该类型用于存储当前程序的用户身份。

**类型结构**

```cpp
typedef struct {
    char            name[64];
    UserType        user_type;
} UserInfo;
```

&emsp;**name** &emsp;名称字符串。

&emsp;**user\_type** &emsp;用户类别。

<a id="xapi-3-5-2"></a>

### 3-5-2 TimeType类型

该类型用于存储分解为年月日时分秒的时间信息。

**类型结构**

```cpp
typedef struct
{
    int tm_sec;
    int tm_min;
    int tm_hour;
    int tm_mday;
    int tm_mon;
    int tm_year;
    int tm_wday;
    int tm_yday;
    int tm_isdst;
} TimeType;
```

&emsp;**tm\_sec** &emsp;秒数，0至59。

&emsp;**tm\_min** &emsp;分钟数，0至59。

&emsp;**tm\_hour** &emsp;小时数，0至23。

&emsp;**tm\_mday** &emsp;月内日期，1至31。

&emsp;**tm\_mon** &emsp;月份，1至12。

&emsp;**tm\_year** &emsp;年份。

&emsp;**tm\_wday** &emsp;星期，星期日为1。

&emsp;**tm\_yday** &emsp;年内日序号，0至365。

&emsp;**tm\_isdst** &emsp;夏令时标志。

<a id="xapi-3-5-3"></a>

### 3-5-3 xapi\_GetSystemVersion();

该函数会返回一串字符串作为当前操作系统版本号。

**函数参数**

```cpp
void xapi_GetSystemVersion(WSTR version);
```

&emsp;**version** &emsp;用于接收版本字符串或CPU型号的字符缓冲区。

返回值 &emsp;无。

<a id="xapi-3-5-4"></a>

### 3-5-4 xapi\_GetTime();

该函数会返回当前时间（单位：秒（从1980年开始））。

**函数参数**

```cpp
UINT64 xapi_GetTime(void);
```

返回值 &emsp;当前时间（单位：秒（从1980年开始））。

<a id="xapi-3-5-5"></a>

### 3-5-5 xapi\_GetCurrentUser();

该函数会返回当前线程的用户（权限）信息。

**函数参数**

```cpp
void xapi_GetCurrentUser(UserInfo *user_info);
```

&emsp;**user\_info** &emsp;用于接收当前用户信息的结构体。 结构见3-5-1。

返回值 &emsp;无。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XUT\_Root | 0 | Root用户。 |
| XUT\_System | 1 | System用户。 |
| XUT\_Admin | 2 | 管理员用户。 |
| XUT\_Visitor | 3 | 普通访客程序。 |
| XUT\_Custom | 4 | 自定义权限用户。 |

<a id="table-3-5-5-1"></a>

**表格3-5-5-1 UserType**

<a id="xapi-3-5-6"></a>

### 3-5-6 xapi\_GetTimeX();

该函数会返回当前计算后的时间信息。

**函数参数**

```cpp
void xapi_GetTimeX(TimeType *tm);
```

&emsp;**tm** &emsp;用于接收分解时间的结构体。 结构见3-5-2。

返回值 &emsp;无。

<a id="xapi-3-5-7"></a>

### 3-5-7 xapi\_GetCpuModel();

该函数会返回一串字符串作为当前客户机的中央处理器型号。

**函数参数**

```cpp
void xapi_GetCpuModel(WSTR version);
```

&emsp;**version** &emsp;用于接收版本字符串或CPU型号的字符缓冲区。

返回值 &emsp;无。

<a id="xapi-3-5-8"></a>

### 3-5-8 xapi\_GetMemorySize();

该函数会返回当前客户机的内存大小（单位MB）。

**函数参数**

```cpp
UINT64 xapi_GetMemorySize(void);
```

返回值 &emsp;内存大小

<a id="xapi-3-5-9"></a>

### 3-5-9 xapi\_GetTimeNano();

该函数会返回当前的纳秒级时间戳。（注意时间戳零点根据设备厂商可能会有所不同，故零点无参考价值）

**函数参数**

```cpp
UINT64 xapi_GetTimeNano(void);
```

返回值 &emsp;时间戳

<a id="xapi-3-6"></a>

## 3-6 运行

<a id="xapi-3-6-1"></a>

### 3-6-1 XapiSystemStats类型

该类型用于存储系统CPU和内存的统计快照。

**类型结构**

```cpp
typedef struct
{
    UINT64 cpu_total_ticks;
    UINT64 cpu_busy_ticks;
    UINT64 cpu_count;
    UINT64 memory_total_bytes;
    UINT64 memory_free_bytes;
    UINT64 timestamp_ns;
} XapiSystemStats;
```

&emsp;**cpu\_total\_ticks** &emsp;CPU累计总计数或忙碌计数。

&emsp;**cpu\_busy\_ticks** &emsp;CPU累计总计数或忙碌计数。

&emsp;**cpu\_count** &emsp;CPU数量。

&emsp;**memory\_total\_bytes** &emsp;总内存或空闲内存，单位字节。

&emsp;**memory\_free\_bytes** &emsp;总内存或空闲内存，单位字节。

&emsp;**timestamp\_ns** &emsp;采样时的单调时间戳，单位纳秒。

<a id="xapi-3-6-2"></a>

### 3-6-2 xapi\_Broken();

该函数会结束当前程序并弹出 应用程序崩溃 对话框。

**函数参数**

```cpp
void xapi_Broken(WSTR broken_info);
```

&emsp;**broken\_info** &emsp;崩溃提示文本，可以为NULL。

返回值 &emsp;无。

<a id="xapi-3-6-3"></a>

### 3-6-3 xapi\_Sleep();

该函数会进行休眠。单位为毫秒（不保证绝对准确，有一定误差）。

**函数参数**

```cpp
void xapi_Sleep(UINT64 ms);
```

&emsp;**ms** &emsp;休眠时间，单位毫秒。

返回值 &emsp;无。

<a id="xapi-3-6-4"></a>

### 3-6-4 xapi\_Run();

该函数会使用默认方式打开指定的程序或文件。

**函数参数**

```cpp
void xapi_Run(WSTR path);
```

&emsp;**path** &emsp;文件或目录的路径。

返回值 &emsp;无。

<a id="xapi-3-6-5"></a>

### 3-6-5 xapi\_FlushTime();

该函数会刷新当前的时间偏移量。

**函数参数**

```cpp
void xapi_FlushTime(void);
```

返回值 &emsp;无。

<a id="xapi-3-6-6"></a>

### 3-6-6 xapi\_GetSystemStats();

该函数将会获取当前系统的CPU运行计数、CPU数量、内存使用情况及采样时间。

**函数参数**

```cpp
UINT64 xapi_GetSystemStats(XapiSystemStats *stats);
```

&emsp;**stats** &emsp;用于接收系统运行统计的结构体。 结构见3-6-1。

返回值 &emsp;成功返回0，失败返回负errno。 返回类型为UINT64时，负错误以该无符号类型编码。

<a id="xapi-3-6-7"></a>

### 3-6-7 xapi\_RunArgs();

该函数将会使用指定的命令行参数启动程序。新程序使用普通Visitor权限，不会自动继承调用者的提升权限。

**函数参数**

```cpp
UINT64 xapi_RunArgs(WSTR path, WSTR argv[]);
```

&emsp;**path** &emsp;文件或目录的路径。

&emsp;**argv** &emsp;以空指针结束的命令行参数字符串数组。

返回值 &emsp;成功返回新进程PID，失败返回编码在UINT64中的负错误值。

<a id="xapi-3-6-8"></a>

### 3-6-8 xapi\_SpawnInherited();

该函数将会创建一个子进程，并继承调用者的用户身份和现有权限。此操作不会授予父进程本来没有的权限。

**函数参数**

```cpp
UINT64 xapi_SpawnInherited(WSTR path, WSTR argv[]);
```

&emsp;**path** &emsp;文件或目录的路径。

&emsp;**argv** &emsp;以空指针结束的命令行参数字符串数组。

返回值 &emsp;成功返回子进程PID；失败返回编码在UINT64中的负errno。

<a id="xapi-3-6-9"></a>

### 3-6-9 xapi\_PowerAction();

该函数将会请求重新启动或关闭计算机。操作需要更改设置权限。

**函数参数**

```cpp
UINT64 xapi_PowerAction(UINT64 action);
```

&emsp;**action** &emsp;电源操作编号。

返回值 &emsp;成功返回0，失败返回负errno。 返回类型为UINT64时，负错误以该无符号类型编码。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XPOWER\_REBOOT | 1 | 重新启动计算机。 |
| XPOWER\_SHUTDOWN | 2 | 关闭计算机。 |

<a id="table-3-6-9-1"></a>

**表格3-6-9-1 电源操作**

<a id="xapi-3-7"></a>

## 3-7 内存

<a id="xapi-3-7-1"></a>

### 3-7-1 xapi\_AllocateMemory();

该函数会分配一块指定大小的内存。

**函数参数**

```cpp
void   * xapi_AllocateMemory(UINT64 size);
```

&emsp;**size** &emsp;文字大小；结构体字段中的**size**另有说明。

返回值 &emsp;指向分配的内存，如为NULL则代表分配失败。

<a id="xapi-3-7-2"></a>

### 3-7-2 xapi\_FreeMemory();

该函数会释放一块指定大小的内存。

**函数参数**

```cpp
void xapi_FreeMemory(void *ptr);
```

&emsp;**ptr** &emsp;内存指针；映射时表示期望起始地址，NULL表示由内核选择。

返回值 &emsp;无。

<a id="xapi-3-7-3"></a>

### 3-7-3 xapi\_MapMemory();

该函数会映射一块指定大小的内存到指定位置。

**函数参数**

```cpp
void   * xapi_MapMemory(
    void *ptr,
    uint64_t size,
    uint32_t flags
);
```

&emsp;**ptr** &emsp;内存指针；映射时表示期望起始地址，NULL表示由内核选择。

&emsp;**size** &emsp;文字大小；结构体字段中的**size**另有说明。

&emsp;**flags** &emsp;本次操作的标志位。

返回值 &emsp;映射区域的起始地址。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| PTE\_PRESENT | (0x1 &lt;&lt; 0) | 映射页存在。 |
| PTE\_WRITEABLE | (0x1 &lt;&lt; 1) | 允许写入。 |
| PTE\_USER | (0x1 &lt;&lt; 2) | 允许用户态访问。 |
| PTE\_FLAG\_U | (0x1 &lt;&lt; 3) | 项目定义的附加页标志。 |
| PTE\_HUGE | (0x1 &lt;&lt; 7) | 使用大页标志。 |
| PTE\_NO\_EXECUTE | (((uint64\_t)0x1) &lt;&lt; 63) | 禁止执行。 |

<a id="table-3-7-3-1"></a>

**表格3-7-3-1 内存映射标志**

<a id="xapi-3-8"></a>

## 3-8 音频

<a id="xapi-3-8-1"></a>

### 3-8-1 PCM音频流接口

<a id="xapi-3-8-1-1"></a>

#### 3-8-1-1 XAudioDeviceInfo类型

该类型用于存储音频设备的能力和名称。

**类型结构**

```cpp
typedef struct XAudioDeviceInfo
{
    XAudioU32 size, version;
    XAudioU64 device;
    XAudioU32 directions, format, native_rate, native_channels;
    XAudioU32 period_frames, hardware_buffer_frames, max_streams, max_buffer_frames;
    XAudioU32 rate_count, rates[8];
    XAudioU32 reserved;
    char name[64];
} XAudioDeviceInfo;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**device** &emsp;音频设备编号。

&emsp;**directions** &emsp;支持的方向位或本流方向。

&emsp;**format** &emsp;数据格式编号。

&emsp;**native\_rate** &emsp;硬件原生采样率，单位Hz。

&emsp;**native\_channels** &emsp;硬件原生声道数。

&emsp;**period\_frames** &emsp;硬件每个处理周期的帧数。

&emsp;**hardware\_buffer\_frames** &emsp;硬件缓冲区帧数。

&emsp;**max\_streams** &emsp;设备允许的流数量上限。

&emsp;**max\_buffer\_frames** &emsp;单流缓冲区帧数上限。

&emsp;**rate\_count** &emsp;rates中有效采样率的数量。

&emsp;**rates** &emsp;设备接受的采样率数组。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**name** &emsp;名称字符串。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-3-8-1-2"></a>

#### 3-8-1-2 XAudioDeviceSettings类型

该类型用于存储音频设备的主音量和静音状态。

**类型结构**

```cpp
typedef struct XAudioDeviceSettings
{
    XAudioU32 size, version, volume_q16, muted;
    XAudioU64 device, reserved;
} XAudioDeviceSettings;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**volume\_q16** &emsp;Q16音量，65536表示原音量。

&emsp;**muted** &emsp;静音状态，0或1。

&emsp;**device** &emsp;音频设备编号。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-3-8-1-3"></a>

#### 3-8-1-3 XAudioDesc类型

该类型用于存储创建PCM音频流时的配置。

**类型结构**

```cpp
typedef struct XAudioDesc
{
    XAudioU32 size, version;
    XAudioU64 device;
    XAudioU32 direction, format, sample_rate, channels;
    XAudioU32 buffer_frames, wakeup_frames;
    XAudioU64 reserved[2];
} XAudioDesc;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**device** &emsp;音频设备编号。

&emsp;**direction** &emsp;支持的方向位或本流方向。

&emsp;**format** &emsp;数据格式编号。

&emsp;**sample\_rate** &emsp;流或解码音频的采样率，单位Hz。

&emsp;**channels** &emsp;声道数。

&emsp;**buffer\_frames** &emsp;流的软件缓冲区容量，以帧计。

&emsp;**wakeup\_frames** &emsp;报告就绪时使用的帧数阈值。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-3-8-1-4"></a>

#### 3-8-1-4 XAudioStatus类型

该类型用于存储音频流的状态和播放进度。

**类型结构**

```cpp
typedef struct XAudioStatus
{
    XAudioU32 size, version, state, events;
    XAudioU64 device;
    XAudioU32 format, sample_rate, channels, buffer_frames;
    XAudioU32 writable_frames, readable_frames, volume_q16, muted;
    XAudioU64 submitted_frames, played_frames, dropped_frames, pending_frames;
    XAudioU64 underrun_count, latency_ns, timestamp_ns, accuracy_ns;
    XAudioU32 position_flags, reserved;
} XAudioStatus;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**state** &emsp;对象当前状态，使用对应接口的状态常量。

&emsp;**events** &emsp;当前事件位。

&emsp;**device** &emsp;音频设备编号。

&emsp;**format** &emsp;数据格式编号。

&emsp;**sample\_rate** &emsp;流或解码音频的采样率，单位Hz。

&emsp;**channels** &emsp;声道数。

&emsp;**buffer\_frames** &emsp;流的软件缓冲区容量，以帧计。

&emsp;**writable\_frames** &emsp;当前可写或可读帧数。

&emsp;**readable\_frames** &emsp;当前可写或可读帧数。

&emsp;**volume\_q16** &emsp;Q16音量，65536表示原音量。

&emsp;**muted** &emsp;静音状态，0或1。

&emsp;**submitted\_frames** &emsp;已接收的累计输入帧数。

&emsp;**played\_frames** &emsp;硬件已确认播放的累计帧数。

&emsp;**dropped\_frames** &emsp;因停止等操作丢弃的累计帧数。

&emsp;**pending\_frames** &emsp;软件队列及设备流水线中尚待处理的帧数。

&emsp;**underrun\_count** &emsp;流发生欠载的计数。

&emsp;**latency\_ns** &emsp;延迟估计，单位纳秒，不是声学测量值。

&emsp;**timestamp\_ns** &emsp;采样时的单调时间戳，单位纳秒。

&emsp;**accuracy\_ns** &emsp;播放位置精度说明，单位纳秒。

&emsp;**position\_flags** &emsp;播放位置精度标志。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-3-8-1-5"></a>

#### 3-8-1-5 xapi\_AudioEnumDevices();

该函数将会列出当前可用音频设备的编号。

**函数参数**

```cpp
XAudioResult xapi_AudioEnumDevices(
    XAudioU64 *devices,
    XAudioU32 capacity
);
```

&emsp;**devices** &emsp;用于接收设备编号的数组。

&emsp;**capacity** &emsp;输出缓冲区可以容纳的条目数；字节缓冲区接口以字节计。

返回值 &emsp;成功返回设备数量，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-1-6"></a>

#### 3-8-1-6 xapi\_AudioGetDeviceInfo();

该函数将会获取指定音频设备的名称、支持的格式、采样率和缓冲区容量等信息。

**函数参数**

```cpp
XAudioResult xapi_AudioGetDeviceInfo(
    XAudioU64 device,
    XAudioDeviceInfo *info
);
```

&emsp;**device** &emsp;音频设备编号。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见3-8-1-1。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAUDIO\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XAUDIO\_PLAYBACK | 1U | 播放输出方向。 |
| XAUDIO\_CAPTURE | 2U | 录音输入方向；当前后端尚不支持。 |
| XAUDIO\_S16\_LE | 1U | 16位有符号小端PCM格式。 |
| XAUDIO\_MAX\_STREAMS | 64U | 音频流数量上限。 |
| XAUDIO\_MAX\_BUFFER\_FRAMES | 8192U | 单流缓冲区帧数上限。 |

<a id="table-3-8-1-6-1"></a>

**表格3-8-1-6-1 音频版本、方向、格式和设备上限**

<a id="xapi-3-8-1-7"></a>

#### 3-8-1-7 xapi\_AudioGetDeviceSettings();

该函数将会读取指定音频设备的主音量和静音状态。

**函数参数**

```cpp
XAudioResult xapi_AudioGetDeviceSettings(
    XAudioU64 device,
    XAudioDeviceSettings *settings
);
```

&emsp;**device** &emsp;音频设备编号。

&emsp;**settings** &emsp;设备音量和静音设置结构体。 结构见3-8-1-2。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAUDIO\_VOLUME\_ONE | 65536U | 单位线性音量，对应Q16值65536。 |

<a id="table-3-8-1-7-1"></a>

**表格3-8-1-7-1 音量单位**

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-1-8"></a>

#### 3-8-1-8 xapi\_AudioSetDeviceSettings();

该函数将会修改指定音频设备的主音量和静音状态。这些设置影响该设备上的所有播放流。

**函数参数**

```cpp
XAudioResult xapi_AudioSetDeviceSettings(
    const XAudioDeviceSettings *settings
);
```

&emsp;**settings** &emsp;设备音量和静音设置结构体。 结构见3-8-1-2。

返回值 &emsp;成功返回0，失败返回负errno。

Root、System、Admin或具有ChangeSettings权限的Custom程序可以修改。当前只改变运行时设置，不会自动加载或保存配置文件。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-1-7-1。

<a id="xapi-3-8-1-9"></a>

#### 3-8-1-9 xapi\_AudioOpen();

该函数将会按指定的格式创建一个PCM音频流。创建后可以预先写入数据，但不会自动开始播放。

**函数参数**

```cpp
XAudioResult xapi_AudioOpen(
    const XAudioDesc *desc,
    XAudioHandle *stream
);
```

&emsp;**desc** &emsp;描述本次操作的输入结构体指针。 结构见3-8-1-3。

&emsp;**stream** &emsp;用于接收音频流句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

所有音频描述符和输出结构使用sizeof设置size，version填写XAUDIO\_ABI\_VERSION，保留字段置零。设备0表示打开时选择默认设备。当前只支持S16\_LE播放流、单声道或双声道。句柄不由fork继承，exec和退出会撤销资源。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAUDIO\_READY | 1U | 已准备好。 |
| XAUDIO\_RUNNING | 2U | 正在运行或播放。 |
| XAUDIO\_PAUSED | 3U | 已经暂停。 |
| XAUDIO\_DRAINING | 4U | 正在播放队列中剩余的数据。 |
| XAUDIO\_ERROR | 5U | 发生错误。 |

<a id="table-3-8-1-9-1"></a>

**表格3-8-1-9-1 音频流状态**

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-1-10"></a>

#### 3-8-1-10 xapi\_AudioWrite();

该函数将会向音频流写入PCM采样数据。每次可能只接收一部分数据，程序应按实际返回的帧数继续写入。

**函数参数**

```cpp
XAudioResult xapi_AudioWrite(
    XAudioHandle stream,
    const void *pcm,
    XAudioU32 frames,
    XAudioI32 timeout_ms
);
```

&emsp;**stream** &emsp;音频流句柄。

&emsp;**pcm** &emsp;PCM采样缓冲区。一帧包含所有声道的同一时刻采样。

&emsp;**frames** &emsp;请求传输的PCM帧数。

&emsp;**timeout\_ms** &emsp;等待上限，单位毫秒。0立即操作，-1无限等待。

返回值 &emsp;成功返回实际传输的PCM帧数，失败返回负errno。

一帧包含同一时刻全部声道的采样。双声道S16一帧占4字节。当前单次最多接收256帧；调用期间复制数据。timeout\_ms为0时立即操作，-1表示无限等待，正数表示毫秒。写入本身不会开始播放。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-1-11"></a>

#### 3-8-1-11 xapi\_AudioRead();

该函数用于从录音流读取PCM采样数据。当前输出后端尚不支持录音，此调用返回不支持操作的错误。

**函数参数**

```cpp
XAudioResult xapi_AudioRead(
    XAudioHandle stream,
    void *pcm,
    XAudioU32 frames,
    XAudioI32 timeout_ms
);
```

&emsp;**stream** &emsp;音频流句柄。

&emsp;**pcm** &emsp;PCM采样缓冲区。一帧包含所有声道的同一时刻采样。

&emsp;**frames** &emsp;请求传输的PCM帧数。

&emsp;**timeout\_ms** &emsp;等待上限，单位毫秒。0立即操作，-1无限等待。

返回值 &emsp;成功返回实际传输的PCM帧数，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-1-12"></a>

#### 3-8-1-12 xapi\_AudioControl();

该函数将会开始、暂停、恢复、停止或排空指定音频流。

**函数参数**

```cpp
XAudioResult xapi_AudioControl(
    XAudioHandle stream,
    XAudioU32 command
);
```

&emsp;**stream** &emsp;音频流句柄。

&emsp;**command** &emsp;音频控制命令。

返回值 &emsp;成功返回0，失败返回负errno。

STOP丢弃软件队列并回到READY；DRAIN继续播放剩余数据，排空期间不接受新数据。控制效果应用于后续混音，设备缓冲中已有数据可能继续发声。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAUDIO\_START | 1U | 开始运行。 |
| XAUDIO\_PAUSE | 2U | 暂停并保留进度。 |
| XAUDIO\_RESUME | 3U | 恢复运行。 |
| XAUDIO\_STOP | 4U | 停止并清除待处理数据。 |
| XAUDIO\_DRAIN | 5U | 继续播放并等待已有数据排空。 |

<a id="table-3-8-1-12-1"></a>

**表格3-8-1-12-1 音频控制命令**

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-1-9-1。

<a id="xapi-3-8-1-13"></a>

#### 3-8-1-13 xapi\_AudioQuery();

该函数将会获取音频流的状态、可读写帧数、播放进度、延迟估计和错误事件。

**函数参数**

```cpp
XAudioResult xapi_AudioQuery(
    XAudioHandle stream,
    XAudioStatus *status
);
```

&emsp;**stream** &emsp;音频流句柄。

&emsp;**status** &emsp;用于接收当前状态的结构体指针。 结构见3-8-1-4。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAUDIO\_WRITABLE | 1U | 可以写入数据。 |
| XAUDIO\_READABLE | 2U | 可以读取数据。 |
| XAUDIO\_DRAINED | 4U | 已有音频数据已经排空。 |
| XAUDIO\_FAILED | 8U | 发生错误。 |
| XAUDIO\_DEVICE\_LOST | 16U | 音频设备已失去。 |
| XAUDIO\_POSITION\_PERIOD | 1U | 播放位置按硬件周期确认。 |

<a id="table-3-8-1-13-1"></a>

**表格3-8-1-13-1 音频事件和位置精度**

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-1-7-1、表格3-8-1-9-1。

<a id="xapi-3-8-1-14"></a>

#### 3-8-1-14 xapi\_AudioWait();

该函数将会等待指定的音频事件。返回后仍需检查events中的事件位，以区分就绪、排空和设备错误。

**函数参数**

```cpp
XAudioResult xapi_AudioWait(
    XAudioHandle stream,
    XAudioU32 mask,
    XAudioI32 timeout_ms,
    XAudioU32 *events
);
```

&emsp;**stream** &emsp;音频流句柄。

&emsp;**mask** &emsp;需要等待的事件位，可按位或组合。

&emsp;**timeout\_ms** &emsp;等待上限，单位毫秒。0立即操作，-1无限等待。

&emsp;**events** &emsp;用于接收实际事件位的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-1-13-1。

<a id="xapi-3-8-1-15"></a>

#### 3-8-1-15 xapi\_AudioSetVolume();

该函数将会设置当前音频流的音量，不改变同一设备上其他流的音量。

**函数参数**

```cpp
XAudioResult xapi_AudioSetVolume(
    XAudioHandle stream,
    XAudioU32 volume_q16
);
```

&emsp;**stream** &emsp;音频流句柄。

&emsp;**volume\_q16** &emsp;Q16线性音量，0表示静音，65536表示原音量。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-1-7-1。

<a id="xapi-3-8-1-16"></a>

#### 3-8-1-16 xapi\_AudioSetMute();

该函数将会设置当前音频流是否静音，不改变已保存的音量值。

**函数参数**

```cpp
XAudioResult xapi_AudioSetMute(
    XAudioHandle stream,
    XAudioU32 muted
);
```

&emsp;**stream** &emsp;音频流句柄。

&emsp;**muted** &emsp;静音状态，0为不静音，1为静音。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-1-17"></a>

#### 3-8-1-17 xapi\_AudioClose();

该函数将会关闭音频流并撤销句柄。尚未播放的软件队列数据会被丢弃。

**函数参数**

```cpp
XAudioResult xapi_AudioClose(XAudioHandle stream);
```

&emsp;**stream** &emsp;音频流句柄。

返回值 &emsp;成功返回0，失败返回负errno。

若要求完整播放，应先发送DRAIN并等待DRAINED事件，再关闭流。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-2"></a>

### 3-8-2 音频播放

<a id="xapi-3-8-2-1"></a>

#### 3-8-2-1 XAudioPlayerStatus类型

该类型用于存储文件播放器的状态及时间位置。

**类型结构**

```cpp
typedef struct XAudioPlayerStatus
{
    XAudioU32 size, version, state, sample_rate;
    XAudioU32 channels, volume_q16;
    XAudioResult error;
    XAudioU64 position_ns, duration_ns;
} XAudioPlayerStatus;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**state** &emsp;对象当前状态，使用对应接口的状态常量。

&emsp;**sample\_rate** &emsp;流或解码音频的采样率，单位Hz。

&emsp;**channels** &emsp;声道数。

&emsp;**volume\_q16** &emsp;Q16音量，65536表示原音量。

&emsp;**error** &emsp;失败原因；负值表示错误。

&emsp;**position\_ns** &emsp;当前位置或总时长，单位纳秒。

&emsp;**duration\_ns** &emsp;当前位置或总时长，单位纳秒。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-3-8-2-2"></a>

#### 3-8-2-2 xapi\_AudioPlayerOpen();

该函数将会打开一个WAV或MP3文件，并创建用户态流式播放器。打开成功后不会自动播放。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerOpen(
    const char *path,
    XAudioPlayer *player
);
```

&emsp;**path** &emsp;文件或目录的路径。

&emsp;**player** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

支持整数PCM WAV（8/16/24/32位）和MP3。播放器使用私有工作线程；fork子进程不能使用继承的播放器句柄，在exec之前也不能新建播放器。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAUDIO\_PLAYER\_READY | 1U | 已准备好。 |
| XAUDIO\_PLAYER\_PLAYING | 2U | 正在运行或播放。 |
| XAUDIO\_PLAYER\_PAUSED | 3U | 已经暂停。 |
| XAUDIO\_PLAYER\_DRAINING | 4U | 正在播放队列中剩余的数据。 |
| XAUDIO\_PLAYER\_COMPLETED | 5U | 操作已经完成。 |
| XAUDIO\_PLAYER\_ERROR | 6U | 发生错误。 |
| XAUDIO\_DURATION\_UNKNOWN | (~0ULL) | 总时长或总帧数尚未知。 |

<a id="table-3-8-2-2-1"></a>

**表格3-8-2-2-1 播放器状态和时长**

本接口所用常量及相关状态说明请参见表格3-8-1-6-1。

<a id="xapi-3-8-2-3"></a>

#### 3-8-2-3 xapi\_AudioPlayerPlay();

该函数将会开始或继续播放指定播放器中的音频。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerPlay(XAudioPlayer player);
```

&emsp;**player** &emsp;播放器句柄；Open时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-2-2-1。

<a id="xapi-3-8-2-4"></a>

#### 3-8-2-4 xapi\_AudioPlayerPause();

该函数将会暂停播放并保留当前位置。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerPause(XAudioPlayer player);
```

&emsp;**player** &emsp;播放器句柄；Open时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-2-2-1。

<a id="xapi-3-8-2-5"></a>

#### 3-8-2-5 xapi\_AudioPlayerStop();

该函数将会停止播放并把位置移回文件开头。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerStop(XAudioPlayer player);
```

&emsp;**player** &emsp;播放器句柄；Open时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-2-2-1。

<a id="xapi-3-8-2-6"></a>

#### 3-8-2-6 xapi\_AudioPlayerSeek();

该函数将会同步跳转到指定的播放时间。MP3文件的跳转可能需要扫描文件。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerSeek(
    XAudioPlayer player,
    XAudioU64 position_ns
);
```

&emsp;**player** &emsp;播放器句柄；Open时为接收句柄的指针。

&emsp;**position\_ns** &emsp;目标播放位置，单位纳秒。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-2-2-1。

<a id="xapi-3-8-2-7"></a>

#### 3-8-2-7 xapi\_AudioPlayerQuery();

该函数将会读取播放器状态、当前位置、总时长、音量和异步播放错误。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerQuery(
    XAudioPlayer player,
    XAudioPlayerStatus *status
);
```

&emsp;**player** &emsp;播放器句柄；Open时为接收句柄的指针。

&emsp;**status** &emsp;用于接收当前状态的结构体指针。 结构见3-8-2-1。

返回值 &emsp;成功返回0，失败返回负errno。

position\_ns和duration\_ns的单位为纳秒。MP3时长可能暂时未知，此时duration\_ns为XAUDIO\_DURATION\_UNKNOWN。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-1-7-1、表格3-8-2-2-1。

<a id="xapi-3-8-2-8"></a>

#### 3-8-2-8 xapi\_AudioPlayerSetVolume();

该函数将会设置指定播放器的音量。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerSetVolume(
    XAudioPlayer player,
    XAudioU32 volume_q16
);
```

&emsp;**player** &emsp;播放器句柄；Open时为接收句柄的指针。

&emsp;**volume\_q16** &emsp;Q16线性音量，0表示静音，65536表示原音量。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-1-7-1、表格3-8-2-2-1。

<a id="xapi-3-8-2-9"></a>

#### 3-8-2-9 xapi\_AudioPlayerClose();

该函数将会关闭播放器，等待其工作线程退出，并释放文件、解码器和音频流。

**函数参数**

```cpp
XAudioResult xapi_AudioPlayerClose(XAudioPlayer player);
```

&emsp;**player** &emsp;播放器句柄；Open时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-2-2-1。

<a id="xapi-3-8-3"></a>

### 3-8-3 MP3解码

<a id="xapi-3-8-3-1"></a>

#### 3-8-3-1 XMp3Info类型

该类型用于存储MP3解码器的格式、帧位置和错误。

**类型结构**

```cpp
typedef struct XMp3Info
{
    XAudioU32 size, version, sample_rate, channels;
    XAudioU32 format, flags;
    XAudioU64 position_frames, total_frames;
    XMp3Result error;
} XMp3Info;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**sample\_rate** &emsp;流或解码音频的采样率，单位Hz。

&emsp;**channels** &emsp;声道数。

&emsp;**format** &emsp;数据格式编号。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**position\_frames** &emsp;当前位置或总长度，以PCM帧计。

&emsp;**total\_frames** &emsp;当前位置或总长度，以PCM帧计。

&emsp;**error** &emsp;失败原因；负值表示错误。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-3-8-3-2"></a>

#### 3-8-3-2 xapi\_Mp3DecoderOpenFile();

该函数将会打开MP3文件并创建解码器。此接口只进行解码，不会打开声卡或自动播放。

**函数参数**

```cpp
XMp3Result xapi_Mp3DecoderOpenFile(
    const char *path,
    XMp3Handle *decoder
);
```

&emsp;**path** &emsp;文件或目录的路径。

&emsp;**decoder** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-3-4-1。

<a id="xapi-3-8-3-3"></a>

#### 3-8-3-3 xapi\_Mp3DecoderOpenMemory();

该函数将会使用内存中的MP3数据创建解码器。默认复制输入，也可以显式借用调用者的只读缓冲区。

**函数参数**

```cpp
XMp3Result xapi_Mp3DecoderOpenMemory(
    const void *data,
    XAudioU64 bytes,
    XAudioU32 flags,
    XMp3Handle *decoder
);
```

&emsp;**data** &emsp;待发送的只读数据缓冲区。

&emsp;**bytes** &emsp;数据长度，单位字节。

&emsp;**flags** &emsp;本次操作的标志位。

&emsp;**decoder** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

默认复制输入；使用XMP3\_MEMORY\_BORROW时，调用者必须使原缓冲区在关闭前保持有效且不被修改。输入上限为64 MiB。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XMP3\_MEMORY\_BORROW | 1U | 借用调用者只读内存，关闭前须保持有效。 |
| XMP3\_MAX\_MEMORY\_BYTES | (64ULL \* 1024 \* 1024) | 内存输入字节数上限。 |

<a id="table-3-8-3-3-1"></a>

**表格3-8-3-3-1 MP3内存输入**

本接口所用常量及相关状态说明请参见表格3-8-3-4-1。

<a id="xapi-3-8-3-4"></a>

#### 3-8-3-4 xapi\_Mp3DecoderGetInfo();

该函数将会获取解码器的采样率、声道数、输出格式、当前位置及错误状态。

**函数参数**

```cpp
XMp3Result xapi_Mp3DecoderGetInfo(
    XMp3Handle decoder,
    XMp3Info *info
);
```

&emsp;**decoder** &emsp;MP3解码器句柄；Open时为接收句柄的指针。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见3-8-3-1。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XMP3\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XMP3\_SEEKABLE | 1U | 支持跳转位置。 |
| XMP3\_EOF | 2U | 已到达数据结束。 |
| XMP3\_FRAMES\_UNKNOWN | (~0ULL) | 总时长或总帧数尚未知。 |

<a id="table-3-8-3-4-1"></a>

**表格3-8-3-4-1 MP3状态**

<a id="xapi-3-8-3-5"></a>

#### 3-8-3-5 xapi\_Mp3DecoderReadPCM();

该函数将会按需解码MP3数据，输出原采样率的交错S16\_LE PCM数据。

**函数参数**

```cpp
XMp3Result xapi_Mp3DecoderReadPCM(
    XMp3Handle decoder,
    short *pcm,
    XAudioU32 capacity_frames
);
```

&emsp;**decoder** &emsp;MP3解码器句柄；Open时为接收句柄的指针。

&emsp;**pcm** &emsp;PCM采样缓冲区。一帧包含所有声道的同一时刻采样。

&emsp;**capacity\_frames** &emsp;输出PCM缓冲区可容纳的帧数。

返回值 &emsp;成功返回实际解码的PCM帧数，返回0表示可解码内容结束，失败返回负errno。

容量和返回值以PCM帧计。解码器可能跳过损坏帧，不能用此接口严格验证MP3文件。总长度通常在EOF后才确定。

本接口所用常量及相关状态说明请参见表格3-8-1-6-1、表格3-8-3-4-1。

<a id="xapi-3-8-3-6"></a>

#### 3-8-3-6 xapi\_Mp3DecoderSeek();

该函数将会同步跳转到指定的PCM帧位置，并返回实际到达的位置。跳转可能从文件开头重新解码。

**函数参数**

```cpp
XMp3Result xapi_Mp3DecoderSeek(
    XMp3Handle decoder,
    XAudioU64 frame,
    XAudioU64 *actual_frame
);
```

&emsp;**decoder** &emsp;MP3解码器句柄；Open时为接收句柄的指针。

&emsp;**frame** &emsp;目标PCM帧位置，从0开始。

&emsp;**actual\_frame** &emsp;用于接收实际到达帧位置的指针。

返回值 &emsp;成功返回0，失败返回负errno。

失败后解码器保留错误状态；成功跳转可以清除错误。同一实例的并发调用返回-EBUSY。

本接口所用常量及相关状态说明请参见表格3-8-3-4-1。

<a id="xapi-3-8-3-7"></a>

#### 3-8-3-7 xapi\_Mp3DecoderClose();

该函数将会关闭解码器并释放其拥有的文件、数据副本及解码缓冲区。

**函数参数**

```cpp
XMp3Result xapi_Mp3DecoderClose(XMp3Handle decoder);
```

&emsp;**decoder** &emsp;MP3解码器句柄；Open时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-8-3-4-1。

<a id="xapi-3-9"></a>

## 3-9 权限

<a id="xapi-3-9-1"></a>

### 3-9-1 UserPermisson类型

该类型用于存储当前程序的七项普通权限。

**类型结构**

```cpp
typedef struct
{
    bool ReadFile;
    bool WriteFile;
    bool ChangeSettings;
    bool VisitAnotherDir;
    bool VisitSysDir;
    bool ReadSysFile;
    bool WriteSysFile;
} UserPermisson;
```

&emsp;**ReadFile** &emsp;是否拥有对应的读、写、更改设置、访问其他目录、访问系统目录、读系统文件或写系统文件权限。

&emsp;**WriteFile** &emsp;是否拥有对应的读、写、更改设置、访问其他目录、访问系统目录、读系统文件或写系统文件权限。

&emsp;**ChangeSettings** &emsp;是否拥有对应的读、写、更改设置、访问其他目录、访问系统目录、读系统文件或写系统文件权限。

&emsp;**VisitAnotherDir** &emsp;是否拥有对应的读、写、更改设置、访问其他目录、访问系统目录、读系统文件或写系统文件权限。

&emsp;**VisitSysDir** &emsp;是否拥有对应的读、写、更改设置、访问其他目录、访问系统目录、读系统文件或写系统文件权限。

&emsp;**ReadSysFile** &emsp;是否拥有对应的读、写、更改设置、访问其他目录、访问系统目录、读系统文件或写系统文件权限。

&emsp;**WriteSysFile** &emsp;是否拥有对应的读、写、更改设置、访问其他目录、访问系统目录、读系统文件或写系统文件权限。

<a id="xapi-3-9-2"></a>

### 3-9-2 xapi\_QueryFileAccess();

该函数将会检查当前程序是否可以按指定方式访问路径，不会打开或修改该路径。

**函数参数**

```cpp
INT64 xapi_QueryFileAccess(const char *path, UINT64 access);
```

&emsp;**path** &emsp;文件或目录的路径。

&emsp;**access** &emsp;请求的路径访问方式，可按位或组合。

返回值 &emsp;0表示已允许，正值为仍缺失的权限位，负值表示接口错误。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XFA\_READ | 1 | 读取文件内容。 |
| XFA\_WRITE | 2 | 写入文件内容。 |
| XFA\_LIST | 4 | 列出目录。 |
| XFA\_STAT | 8 | 查询属性。 |
| XFA\_CREATE | 16 | 创建条目。 |
| XFA\_REMOVE | 32 | 删除条目。 |
| XFA\_NOFOLLOW | 64 | 不跟随符号链接。 |
| XFA\_EXCLUSIVE | 128 | 要求排他创建。 |
| XFA\_EXPORT | 256 | 读取目录导出的实际数据。 |

<a id="table-3-9-2-1"></a>

**表格3-9-2-1 文件访问方式**

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XPERM\_R | 64 | 读文件权限。 |
| XPERM\_W | 32 | 写文件权限。 |
| XPERM\_CS | 16 | 更改设置权限。 |
| XPERM\_NV | 8 | 访问其他目录权限。 |
| XPERM\_SV | 4 | 访问系统目录权限。 |
| XPERM\_SR | 2 | 读系统文件权限。 |
| XPERM\_SW | 1 | 写系统文件权限。 |
| XPERM\_ALL | 127 | 全部普通权限位。 |

<a id="table-3-9-2-2"></a>

**表格3-9-2-2 权限结果位**

<a id="xapi-3-9-3"></a>

### 3-9-3 xapi\_RequestFileAccess();

该函数将会请求访问指定路径所需的权限。只有请求通过后，程序才应继续对应的文件操作。

**函数参数**

```cpp
INT64 xapi_RequestFileAccess(const char *path, UINT64 access);
```

&emsp;**path** &emsp;文件或目录的路径。

&emsp;**access** &emsp;请求的路径访问方式，可按位或组合。

返回值 &emsp;0表示已允许，正值为仍缺失的权限位，负值表示接口错误。

本接口所用常量及相关状态说明请参见表格3-9-2-1。

<a id="xapi-3-9-4"></a>

### 3-9-4 xapi\_RequestSpecialPermission();

该函数将会请求访问当前用户相册的特殊权限。读取、写入和删除是三个独立的权限。

**函数参数**

```cpp
INT64 xapi_RequestSpecialPermission(uint64_t spid);
```

&emsp;**spid** &emsp;特殊权限编号。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XSPT\_Zero | 0 | 保留编号，不能用于请求。 |
| XSPT\_ReadPicture | 1 | 读取当前用户相册。 |
| XSPT\_WritePicture | 2 | 写入相册，不包含删除权限。 |
| XSPT\_DeletePicture | 3 | 删除相册条目，不包含读取和写入权限。 |

<a id="table-3-9-4-1"></a>

**表格3-9-4-1 SpecialPermissionType**

<a id="xapi-3-9-5"></a>

### 3-9-5 xapi\_LiftPermissions();

该函数将会请求把当前程序的权限调整到指定的用户类别。请求仍需经过系统权限检查。

**函数参数**

```cpp
int xapi_LiftPermissions(UserType ut);
```

&emsp;**ut** &emsp;请求的用户类别。

返回值 &emsp;成功返回0；权限请求返回未取得的权限位，接口失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-5-5-1、表格3-9-2-2。

<a id="xapi-3-9-6"></a>

### 3-9-6 xapi\_GetCurrentPermissions();

该函数将会读取当前程序实际拥有的七项普通权限。

**函数参数**

```cpp
int xapi_GetCurrentPermissions(UserPermisson *up);
```

&emsp;**up** &emsp;七项普通权限的结构体或其输出指针。 结构见3-9-1。

返回值 &emsp;成功返回0，接口失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-9-2-2。

<a id="xapi-3-9-7"></a>

### 3-9-7 xapiRequestPermissions();

该函数将会请求指定的普通权限。请求会经过系统授权流程，并返回未能取得的权限位。

**函数参数**

```cpp
int xapiRequestPermissions(UserPermisson up);
```

&emsp;**up** &emsp;七项普通权限的结构体或其输出指针。 结构见3-9-1。

返回值 &emsp;成功返回0；权限请求返回未取得的权限位，接口失败返回负errno。

本接口所用常量及相关状态说明请参见表格3-9-2-2。

<a id="xapi-3-10"></a>

## 3-10 标记文本解析

<a id="xapi-3-10-1"></a>

### 3-10-1 XML

<a id="xapi-3-10-1-1"></a>

#### 3-10-1-1 XXmlAttribute类型

该类型用于存储XML元素的一个属性。

**类型结构**

```cpp
typedef struct XXmlAttribute
{
    char                 *name;
    char                 *value;
    struct XXmlAttribute *next;
} XXmlAttribute;
```

&emsp;**name** &emsp;XML属性名称字符串。

&emsp;**value** &emsp;XML属性值字符串。

&emsp;**next** &emsp;下一项或下一个兄弟节点指针。

<a id="xapi-3-10-1-2"></a>

#### 3-10-1-2 XXmlNode类型

该类型用于存储XML树中的一个元素或文本节点。

**类型结构**

```cpp
typedef struct XXmlNode
{
    XXmlNodeType   type;
    char          *name;
    char          *text;
    XXmlAttribute *attributes;
    struct XXmlNode *parent;
    struct XXmlNode *firstChild;
    struct XXmlNode *lastChild;
    struct XXmlNode *nextSibling;
} XXmlNode;
```

&emsp;**type** &emsp;节点、值或控件类型。

&emsp;**name** &emsp;名称字符串。

&emsp;**text** &emsp;UTF-8文本。

&emsp;**attributes** &emsp;XML属性链表。

&emsp;**parent** &emsp;父节点指针。

&emsp;**firstChild** &emsp;第一个或最后一个子节点。

&emsp;**lastChild** &emsp;第一个或最后一个子节点。

&emsp;**nextSibling** &emsp;下一项或下一个兄弟节点指针。

<a id="xapi-3-10-1-3"></a>

#### 3-10-1-3 XXmlTree类型

该类型用于存储XML文档的根节点。

**类型结构**

```cpp
typedef struct XXmlTree
{
    XXmlNode *root;
} XXmlTree;
```

&emsp;**root** &emsp;文档根节点或根值。

<a id="xapi-3-10-1-4"></a>

#### 3-10-1-4 xapi\_parseXml();

该函数将会解析XML字符串，并生成包含元素、文本及属性的树。

**函数参数**

```cpp
int xapi_parseXml(const char *xmlText, XXmlTree *outTree);
```

&emsp;**xmlText** &emsp;需要解析的以空字符结尾的文本。

&emsp;**outTree** &emsp;用于接收解析结果的结构体。 结构见3-10-1-3。

返回值 &emsp;成功返回0；失败返回本接口解析结果枚举中的错误值。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_XML\_NODE\_ELEMENT | 1 | 元素节点。 |
| XAPI\_XML\_NODE\_TEXT | 2 | 文本节点。 |

<a id="table-3-10-1-4-1"></a>

**表格3-10-1-4-1 XXmlNodeType**

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_XML\_PARSE\_OK | 0 | 解析成功。 |
| XAPI\_XML\_PARSE\_INVALID\_PARAM | 1 | 参数无效。 |
| XAPI\_XML\_PARSE\_NO\_MEMORY | 2 | 内存不足。 |
| XAPI\_XML\_PARSE\_SYNTAX\_ERROR | 3 | 语法错误。 |
| XAPI\_XML\_PARSE\_MISMATCH\_TAG | 4 | 开始和结束标签不匹配。 |
| XAPI\_XML\_PARSE\_TRAILING\_CONTENT | 5 | 根内容之后还有多余内容。 |

<a id="table-3-10-1-4-2"></a>

**表格3-10-1-4-2 XXmlParseResult**

<a id="xapi-3-10-1-5"></a>

#### 3-10-1-5 xapi\_freeXmlNode();

该函数将会释放指定XML节点及其拥有的子节点和属性。释放后不能继续使用这些指针。

**函数参数**

```cpp
void xapi_freeXmlNode(XXmlNode *node);
```

&emsp;**node** &emsp;需要释放的XML节点。 结构见3-10-1-2。

返回值 &emsp;无。

本接口所用常量及相关状态说明请参见表格3-10-1-4-1。

<a id="xapi-3-10-1-6"></a>

#### 3-10-1-6 xapi\_freeXmlTree();

该函数将会释放整棵XML树持有的内存。

**函数参数**

```cpp
void xapi_freeXmlTree(XXmlTree *tree);
```

&emsp;**tree** &emsp;需要释放的XML树。 结构见3-10-1-3。

返回值 &emsp;无。

<a id="xapi-3-10-2"></a>

### 3-10-2 JSON

<a id="xapi-3-10-2-1"></a>

#### 3-10-2-1 XJsonObjectEntry类型

该类型用于存储JSON对象中的一个键值对。

**类型结构**

```cpp
typedef struct XJsonValue XJsonValue;
typedef struct XJsonObjectEntry
{
    char                    *key;
    XJsonValue              *value;
    struct XJsonObjectEntry *next;
} XJsonObjectEntry;
```

&emsp;**key** &emsp;JSON对象成员的键名。

&emsp;**value** &emsp;该成员对应的JSON值。

&emsp;**next** &emsp;下一个对象成员；链表末尾为NULL。

<a id="xapi-3-10-2-2"></a>

#### 3-10-2-2 XJsonValue类型

该类型用于存储JSON中的一个值及其类型。

**类型结构**

```cpp
struct XJsonValue
{
    XJsonValueType type;
    union
    {
        int               boolValue;
        double            numberValue;
        char             *stringValue;
        XJsonValue       *arrayValue;
        XJsonObjectEntry *objectValue;
    } as;
    struct XJsonValue *next;
};
```

&emsp;**type** &emsp;JSON值的类别。

&emsp;as.boolValue / numberValue / stringValue / arrayValue / objectValue &emsp;根据type读取布尔、数值、字符串、数组链表或对象成员链表。

&emsp;**next** &emsp;下一项值指针。

<a id="xapi-3-10-2-3"></a>

#### 3-10-2-3 XJsonDocument类型

该类型用于存储JSON文档的根值。

**类型结构**

```cpp
typedef struct XJsonDocument
{
    XJsonValue *root;
} XJsonDocument;
```

&emsp;**root** &emsp;文档根节点或根值。

<a id="xapi-3-10-2-4"></a>

#### 3-10-2-4 xapi\_parseJson();

该函数将会解析JSON字符串，生成由对象、数组和基本值组成的文档。

**函数参数**

```cpp
int xapi_parseJson(
    const char *jsonText,
    XJsonDocument *outDocument
);
```

&emsp;**jsonText** &emsp;需要解析的以空字符结尾的文本。

&emsp;**outDocument** &emsp;用于接收解析结果的结构体。 结构见3-10-2-3。

返回值 &emsp;成功返回0；失败返回本接口解析结果枚举中的错误值。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_JSON\_VALUE\_NULL | 0 | 空值。 |
| XAPI\_JSON\_VALUE\_BOOL | 1 | 布尔值。 |
| XAPI\_JSON\_VALUE\_NUMBER | 2 | 数值。 |
| XAPI\_JSON\_VALUE\_STRING | 3 | 字符串。 |
| XAPI\_JSON\_VALUE\_ARRAY | 4 | 数组。 |
| XAPI\_JSON\_VALUE\_OBJECT | 5 | 对象。 |

<a id="table-3-10-2-4-1"></a>

**表格3-10-2-4-1 XJsonValueType**

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_JSON\_PARSE\_OK | 0 | 解析成功。 |
| XAPI\_JSON\_PARSE\_INVALID\_PARAM | 1 | 参数无效。 |
| XAPI\_JSON\_PARSE\_NO\_MEMORY | 2 | 内存不足。 |
| XAPI\_JSON\_PARSE\_SYNTAX\_ERROR | 3 | 语法错误。 |
| XAPI\_JSON\_PARSE\_INVALID\_NUMBER | 4 | 数字格式无效。 |
| XAPI\_JSON\_PARSE\_INVALID\_STRING | 5 | 字符串格式无效。 |
| XAPI\_JSON\_PARSE\_TRAILING\_CONTENT | 6 | 根内容之后还有多余内容。 |

<a id="table-3-10-2-4-2"></a>

**表格3-10-2-4-2 XJsonParseResult**

<a id="xapi-3-10-2-5"></a>

#### 3-10-2-5 xapi\_freeJsonValue();

该函数将会释放指定JSON值及其拥有的数据。

**函数参数**

```cpp
void xapi_freeJsonValue(XJsonValue *value);
```

&emsp;**value** &emsp;需要释放的JSON值。 结构见3-10-2-2。

返回值 &emsp;无。

本接口所用常量及相关状态说明请参见表格3-10-2-4-1。

<a id="xapi-3-10-2-6"></a>

#### 3-10-2-6 xapi\_freeJsonDocument();

该函数将会释放JSON文档及根值持有的内存。

**函数参数**

```cpp
void xapi_freeJsonDocument(XJsonDocument *document);
```

&emsp;**document** &emsp;需要释放的JSON文档。 结构见3-10-2-3。

返回值 &emsp;无。

<a id="xapi-3-10-2-7"></a>

#### 3-10-2-7 xapi\_jsonObjectGet();

该函数将会按键名查找JSON对象中的值。返回的是文档内部指针，不需要单独释放。

**函数参数**

```cpp
XJsonValue * xapi_jsonObjectGet(
    const XJsonValue *objectValue,
    const char *key
);
```

&emsp;**objectValue** &emsp;要查找的JSON对象。 结构见3-10-2-2。

&emsp;**key** &emsp;要查找的对象键名。

返回值 &emsp;找到时返回文档内部的值指针；类型不符、没有对应成员或下标越界时返回NULL。

本接口所用常量及相关状态说明请参见表格3-10-2-4-1。

<a id="xapi-3-10-2-8"></a>

#### 3-10-2-8 xapi\_jsonArraySize();

该函数将会获取JSON数组的元素数量。

**函数参数**

```cpp
int xapi_jsonArraySize(const XJsonValue *arrayValue);
```

&emsp;**arrayValue** &emsp;要访问的JSON数组。 结构见3-10-2-2。

返回值 &emsp;返回数组的元素数量；参数不是数组时返回0。

本接口所用常量及相关状态说明请参见表格3-10-2-4-1。

<a id="xapi-3-10-2-9"></a>

#### 3-10-2-9 xapi\_jsonArrayAt();

该函数将会按下标获取JSON数组元素。下标从0开始，返回的是文档内部指针。

**函数参数**

```cpp
XJsonValue * xapi_jsonArrayAt(
    const XJsonValue *arrayValue,
    int index
);
```

&emsp;**arrayValue** &emsp;要访问的JSON数组。 结构见3-10-2-2。

&emsp;**index** &emsp;从0开始的下标或同名响应头序号。

返回值 &emsp;找到时返回文档内部的值指针；类型不符、没有对应成员或下标越界时返回NULL。

本接口所用常量及相关状态说明请参见表格3-10-2-4-1。

<a id="xapi-4"></a>

# CHAPTER 4 – XJ380 API (XAPI GUI版)

**XJ380 API (XAPI GUI EDITION)**

本章节将会介绍XAPI的GUI版本。坐标系以窗口左上角（不含标题栏）为(0, 0)。

<a id="xapi-4-1"></a>

## 4-1 创建图形化应用程序

<a id="xapi-4-1-1"></a>

### 4-1-1 XWINDOW类型

该类型用于存储创建窗口时的尺寸、标题和类型。

**类型结构**

```cpp
typedef struct XWINDOW
{
    UINT32 width;
    UINT32 height;
    WSTR   title;
    UINT8  sets;
} XWINDOW;
```

&emsp;**width** &emsp;宽度或高度，单位像素。

&emsp;**height** &emsp;宽度或高度，单位像素。

&emsp;**title** &emsp;标题字符串。

&emsp;**sets** &emsp;窗口类型和附加标志。

<a id="xapi-4-1-2"></a>

### 4-1-2 xapi\_CreateWindow();

该函数将会创建一个窗口。窗口被用户关闭后对应线程也将被结束。

**函数参数**

```cpp
void xapi_CreateWindow(HDLE* handle, XWINDOW* xwin);
```

&emsp;**handle** &emsp;指向窗口句柄的指针。即指向HDLE类型的变量的指针。

&emsp;**xwin** &emsp;一个指向存储了窗口参数的XWINDOW类型的指针。 结构见4-1-1。

返回值 &emsp;无。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XWIN\_NORMAL | 0 | 普通带边框窗口。 |
| XWIN\_FRAME\_OFF | 1 | 无边框窗口。 |
| XWIN\_FULL\_SCR | 2 | 全屏窗口。 |
| XWIN\_TYPE\_MASK | 0x0f | 用于提取窗口类型的位掩码。 |
| XWIN\_SUPPORT\_RESIZEABLE | 0x80 | 允许用户调整窗口大小。 |

<a id="table-4-1-2-1"></a>

**表格4-1-2-1 窗口参数**

<a id="xapi-4-1-3"></a>

### 4-1-3 xapi\_SetWindowTitle();

该函数将会设置窗口的标题。

**函数参数**

```cpp
void xapi_SetWindowTitle(HDLE handle, WSTR str);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**str** &emsp;标题。

返回值 &emsp;无。

<a id="xapi-4-1-4"></a>

### 4-1-4 xapi\_CloseWindow();

该函数将会关闭窗口，但不会结束程序。

**函数参数**

```cpp
void xapi_CloseWindow(HDLE handle);
```

&emsp;**handle** &emsp;窗口句柄。

返回值 &emsp;无。

<a id="xapi-4-1-5"></a>

### 4-1-5 xapi\_SetIcon();

该函数将会设置窗口在任务栏的图标。

**函数参数**

```cpp
void xapi_SetIcon(HDLE handle, WSTR path);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**path** &emsp;图标路径。需为BMP/PNG/JPEG/GIF格式，大小16\*16。

返回值 &emsp;无。

<a id="xapi-4-1-6"></a>

### 4-1-6 xapi\_GetWindowSize();

该函数将会获取窗口的长和宽。

**函数参数**

```cpp
void xapi_GetWindowSize(
    HDLE handle,
    UINT64* width,
    UINT64* height
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**width** &emsp;窗口宽度。

&emsp;**height** &emsp;窗口高度。

返回值 &emsp;无。

<a id="xapi-4-2"></a>

## 4-2 绘图

<a id="xapi-4-2-1"></a>

### 4-2-1 xapi\_DrawPoint();

该函数将会在窗口上绘制点。

**函数参数**

```cpp
void xapi_DrawPoint(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 color
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;竖坐标。

&emsp;**color** &emsp;图形的颜色。采用RGBA（32位色）格式。

返回值 &emsp;无。

<a id="xapi-4-2-2"></a>

### 4-2-2 xapi\_DrawLine();

该函数将会在窗口上绘制线。

**函数参数**

```cpp
void xapi_DrawLine(
    HDLE handle,
    UINT32 x1,
    UINT32 y1,
    UINT32 x2,
    UINT32 y2,
    UINT32 color
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x1** &emsp;起始点横坐标。

&emsp;**y1** &emsp;起始点竖坐标。

&emsp;**x2** &emsp;中止点横坐标。

&emsp;**y2** &emsp;中止点竖坐标。

&emsp;**color** &emsp;图形的颜色。采用RGBA（32位色）格式。

返回值 &emsp;无。

<a id="xapi-4-2-3"></a>

### 4-2-3 xapi\_DrawRect();

该函数将会在窗口上绘制矩形。

**函数参数**

```cpp
void xapi_DrawRect(
    HDLE handle,
    UINT32 x1,
    UINT32 y1,
    UINT32 x2,
    UINT32 y2,
    UINT32 color,
    bool fill
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x1** &emsp;起始点横坐标。

&emsp;**y1** &emsp;起始点竖坐标。

&emsp;**x2** &emsp;中止点横坐标。

&emsp;**y2** &emsp;中止点竖坐标。

&emsp;**color** &emsp;图形的颜色。采用RGBA（32位色）格式。

&emsp;**fill** &emsp;是否为实心。

返回值 &emsp;无。

<a id="xapi-4-2-4"></a>

### 4-2-4 统一绘制事务

<a id="xapi-4-2-4-1"></a>

#### 4-2-4-1 XPaintControl类型

该类型用于存储绘制事务中的一个目标控件。

**类型结构**

```cpp
typedef struct XPaintControl
{
    uint64_t key, native_id;
    uint32_t type, flags;
    int32_t x, y, width, height, value, extent;
    char text[256];
} XPaintControl;
```

&emsp;**key** &emsp;对象成员键名，或控件在窗口内的稳定标识。

&emsp;**native\_id** &emsp;提交成功后返回的原生控件编号。

&emsp;**type** &emsp;节点、值或控件类型。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**x** &emsp;有符号客户区坐标。

&emsp;**y** &emsp;有符号客户区坐标。

&emsp;**width** &emsp;宽度或高度，单位像素。

&emsp;**height** &emsp;宽度或高度，单位像素。

&emsp;**value** &emsp;开关状态、滚动位置等控件当前值。

&emsp;**extent** &emsp;控件范围或滑块长度。

&emsp;**text** &emsp;UTF-8文本。

<a id="xapi-4-2-4-2"></a>

#### 4-2-4-2 xapi\_BeginPaint();

该函数将会为窗口创建一次绘制事务，返回临时绘制表面。后续绘图可使用该表面句柄。

**函数参数**

```cpp
INT64 xapi_BeginPaint(HDLE window, UINT32 width, UINT32 height);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**width** &emsp;宽度或高度，单位像素。

&emsp;**height** &emsp;宽度或高度，单位像素。

返回值 &emsp;成功返回绘制表面句柄，失败返回负errno。

<a id="xapi-4-2-4-3"></a>

#### 4-2-4-3 xapi\_EndPaint();

该函数将会提交绘制结果并消耗表面句柄。窗口大小在绘制期间发生改变时，提交可能失败。

**函数参数**

```cpp
INT64 xapi_EndPaint(HDLE window, HDLE surface);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**surface** &emsp;BeginPaint返回的临时绘制表面句柄。

返回值 &emsp;成功返回0，失败返回负errno。

无论提交成功，还是因窗口尺寸变化返回-EAGAIN，surface都已被消耗，不能再次使用。

<a id="xapi-4-2-4-4"></a>

#### 4-2-4-4 xapi\_CancelPaint();

该函数将会取消绘制事务并释放临时表面，不提交此次绘制结果。

**函数参数**

```cpp
void xapi_CancelPaint(HDLE window, HDLE surface);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**surface** &emsp;BeginPaint返回的临时绘制表面句柄。

返回值 &emsp;无。

<a id="xapi-4-2-4-5"></a>

#### 4-2-4-5 xapi\_PaintControls();

该函数将会为本次绘制事务设置完整的目标控件布局。控件布局随绘制事务一起提交。

**函数参数**

```cpp
INT64 xapi_PaintControls(
    HDLE window,
    HDLE surface,
    XPaintControl *items,
    UINT32 count
);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**surface** &emsp;BeginPaint返回的临时绘制表面句柄。

&emsp;**items** &emsp;条目数组。控件接口中表示完整的目标控件布局。 结构见4-2-4-1。

&emsp;**count** &emsp;条目数量。

返回值 &emsp;成功返回0，失败返回负errno。

items表示完整目标布局。key在同一窗口内应保持稳定；文本输入框的native\_id在成功提交后才可用于输入框操作。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XPAINT\_CONTROLS\_VERSION | 1U | 绘制事务控件布局版本。 |
| XPAINT\_MAX\_CONTROLS | 192U | 绘制事务控件数量上限。 |
| XPAINT\_BUTTON | 1U | 按钮、开关、文本输入框或滚动条控件类型。 |
| XPAINT\_SWITCH | 2U | 按钮、开关、文本输入框或滚动条控件类型。 |
| XPAINT\_TEXT\_INPUT | 3U | 按钮、开关、文本输入框或滚动条控件类型。 |
| XPAINT\_SCROLLBAR | 4U | 按钮、开关、文本输入框或滚动条控件类型。 |
| XPAINT\_CONTROL\_FOCUS | 1U | 提交后使此控件获得输入焦点。 |
| XPAINT\_CONTROL\_RESET\_TEXT | 2U | 用本次提交的text重设输入框文本。 |

<a id="table-4-2-4-5-1"></a>

**表格4-2-4-5-1 绘制事务控件**

<a id="xapi-4-2-5"></a>

### 4-2-5 文字

<a id="xapi-4-2-5-1"></a>

#### 4-2-5-1 XTextStyle类型

该类型用于存储字体、字号及文字定位方式。

**类型结构**

```cpp
typedef struct XTextStyle
{
    uint32_t font, size, unit, anchor, reference, reserved;
} XTextStyle;
```

&emsp;**font** &emsp;字体类别。

&emsp;**size** &emsp;字体大小，按unit指定的单位解释。

&emsp;**unit** &emsp;字号的计量方式。

&emsp;**anchor** &emsp;文字定位锚点。

&emsp;**reference** &emsp;参考字符类别。

&emsp;**reserved** &emsp;保留字段，输入时置零。

<a id="xapi-4-2-5-2"></a>

#### 4-2-5-2 XTextMetrics类型

该类型用于存储文字的逻辑尺寸和实际像素边界。

**类型结构**

```cpp
typedef struct XTextMetrics
{
    uint32_t size, version;
    int32_t ascent, descent, line_gap, line_height;
    int32_t reference_top, reference_bottom, x_height, ch_width;
    int32_t advance_x, ink_left, ink_top, ink_right, ink_bottom;
    uint32_t glyphs;
} XTextMetrics;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**ascent** &emsp;基线上方高度和下方深度，descent为正值。

&emsp;**descent<strong> &emsp;基线上方高度和下方深度，</strong>descent**为正值。

&emsp;**line\_gap** &emsp;行间距和整行高度，单位像素。

&emsp;**line\_height** &emsp;行间距和整行高度，单位像素。

&emsp;**reference\_top** &emsp;相对于基线的参考字符上下边界。

&emsp;**reference\_bottom** &emsp;相对于基线的参考字符上下边界。

&emsp;**x\_height** &emsp;小写字母高度和字符宽度参考值。

&emsp;**ch\_width** &emsp;小写字母高度和字符宽度参考值。

&emsp;**advance\_x** &emsp;逻辑笔位置的水平推进量。

&emsp;**ink\_left** &emsp;实际文字像素边界，按所选锚点计算。

&emsp;**ink\_top** &emsp;实际文字像素边界，按所选锚点计算。

&emsp;**ink\_right** &emsp;实际文字像素边界，按所选锚点计算。

&emsp;**ink\_bottom** &emsp;实际文字像素边界，按所选锚点计算。

&emsp;**glyphs** &emsp;字形数量。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-2-5-3"></a>

#### 4-2-5-3 XTextRect类型

该类型用于存储文字裁剪使用的有符号矩形。

**类型结构**

```cpp
typedef struct XTextRect
{
    INT32 x, y, width, height;
} XTextRect;
```

&emsp;**x** &emsp;有符号客户区坐标。

&emsp;**y** &emsp;有符号客户区坐标。

&emsp;**width** &emsp;宽度或高度，单位像素。

&emsp;**height** &emsp;宽度或高度，单位像素。

<a id="xapi-4-2-5-4"></a>

#### 4-2-5-4 xapi\_DrawText();

该函数将会在窗口上绘制字符串。

**函数参数**

```cpp
void xapi_DrawText(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    WSTR str,
    UINT32 size,
    UINT32 color
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;竖坐标。

&emsp;**str** &emsp;字符串。

&emsp;**size** &emsp;字号（请注意单位不是像素）。

&emsp;**color** &emsp;图形的颜色。采用RGBA（32位色）格式。

返回值 &emsp;无。

<a id="xapi-4-2-5-5"></a>

#### 4-2-5-5 xapi\_DrawTextl();

该函数将会在窗口上绘制字符串，并返回字符串绘制出来的宽度。

**函数参数**

```cpp
void xapi_DrawTextl(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    WSTR str,
    UINT32 size,
    UINT32 color,
    UINT32 *width
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;竖坐标。

&emsp;**str** &emsp;字符串。

&emsp;**size** &emsp;字号（请注意单位不是像素）。

&emsp;**color** &emsp;图形的颜色。采用RGBA（32位色）格式。

&emsp;**width** &emsp;字符串绘制出来的宽度（单位：像素），需传入一个指向uint32\_t类型变量的指针。

返回值 &emsp;无。

<a id="xapi-4-2-5-6"></a>

#### 4-2-5-6 xapi\_DrawSWText();

该函数将会在窗口上绘制等宽字符串。字符宽度约为9像素（含两字间距）。该字体大小恒为9像素宽、16像素高。（中文为18像素宽）

**函数参数**

```cpp
void xapi_DrawSWText(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    WSTR str,
    UINT32 color
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;竖坐标。

&emsp;**str** &emsp;字符串。

&emsp;**color** &emsp;图形的颜色。采用RGBA（32位色）格式。

返回值 &emsp;无。

<a id="xapi-4-2-5-7"></a>

#### 4-2-5-7 xapi\_CalcTextWidth();

该函数将会计算指定字符串在指定大小下的宽度。

**函数参数**

```cpp
UINT64 xapi_CalcTextWidth(WSTR str, UINT32 size);
```

&emsp;**str** &emsp;字符串。

&emsp;**size** &emsp;字号（请注意单位不是像素）。

返回值 &emsp;宽度（单位：像素）

<a id="xapi-4-2-5-8"></a>

#### 4-2-5-8 xapi\_GetTextMetrics();

该函数将会测量文本的行高、逻辑宽度和实际像素边界，不会绘制文本。

**函数参数**

```cpp
INT64 xapi_GetTextMetrics(
    const XTextStyle *style,
    const char *text,
    XTextMetrics *metrics
);
```

&emsp;**style** &emsp;文字样式结构体，或重点提示的样式编号。 结构见4-2-5-1。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**metrics** &emsp;用于接收文字测量结果的结构体。 结构见4-2-5-2。

返回值 &emsp;成功返回0，失败返回负errno。

text为NULL时查询字体度量；非NULL时测量具体文本。逻辑advance与实际墨迹边界不同，绘制和光标定位时应按用途选择。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XTEXT\_VERSION | 1U | 当前接口的版本号。 |
| XTEXT\_FONT\_UI | 0U | 系统界面字体。 |
| XTEXT\_FONT\_MONO | 1U | 等宽字体。 |
| XTEXT\_SIZE\_NATIVE | 0U | 使用原生字号单位。 |
| XTEXT\_SIZE\_EM\_PIXELS | 1U | 以像素指定em大小。 |
| XTEXT\_ANCHOR\_REFERENCE | 0U | 以参考字符定位。 |
| XTEXT\_ANCHOR\_BASELINE | 1U | 以文字基线定位。 |
| XTEXT\_ANCHOR\_LINE\_TOP | 2U | 以文字行顶部定位。 |
| XTEXT\_REFERENCE\_AUTO | 0U | 自动选择参考字符。 |
| XTEXT\_REFERENCE\_H | 1U | 使用拉丁字母H作为参考。 |
| XTEXT\_REFERENCE\_HAN | 2U | 使用汉字作为参考。 |

<a id="table-4-2-5-8-1"></a>

**表格4-2-5-8-1 文字样式和版本**

<a id="xapi-4-2-5-9"></a>

#### 4-2-5-9 xapi\_GetTextPosition();

该函数将会计算UTF-8字符串中指定字节边界对应的水平位置，可用于定位光标。

**函数参数**

```cpp
INT64 xapi_GetTextPosition(
    const XTextStyle *style,
    const char *text,
    UINT32 byte_offset,
    INT32 *position_x
);
```

&emsp;**style** &emsp;文字样式结构体，或重点提示的样式编号。 结构见4-2-5-1。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**byte\_offset** &emsp;字符串中的UTF-8字节偏移，必须位于字符边界。

&emsp;**position\_x** &emsp;用于接收水平位置的指针，单位像素。

返回值 &emsp;成功返回0，失败返回负errno。

byte\_offset必须位于UTF-8字符边界。返回的是逻辑排版位置，不是实际墨迹边界。

本接口所用常量及相关状态说明请参见表格4-2-5-8-1。

<a id="xapi-4-2-5-10"></a>

#### 4-2-5-10 xapi\_DrawTextEx();

该函数将会按照指定字体、大小、锚点和裁剪区域绘制文本。

**函数参数**

```cpp
INT64 xapi_DrawTextEx(
    HDLE handle,
    INT32 x,
    INT32 y,
    const char *text,
    const XTextStyle *style,
    UINT32 color,
    const XTextRect *clip
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**x** &emsp;客户区坐标，单位像素。

&emsp;**y** &emsp;客户区坐标，单位像素。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**style** &emsp;文字样式结构体，或重点提示的样式编号。 结构见4-2-5-1。

&emsp;**color** &emsp;颜色，使用XAPI的RGBA表示。

&emsp;**clip** &emsp;裁剪矩形；为空时不指定额外裁剪矩形。 结构见4-2-5-3。

返回值 &emsp;成功返回0，失败返回负errno。

坐标为有符号客户区坐标；裁剪区域右边和下边均不包含在内。包装函数接受RGBA颜色。

本接口所用常量及相关状态说明请参见表格4-2-5-8-1。

<a id="xapi-4-2-5-11"></a>

#### 4-2-5-11 xapi\_DrawTextBaseline();

该函数将会以指定坐标作为文字基线绘制文本。

**函数参数**

```cpp
INT64 xapi_DrawTextBaseline(
    HDLE handle,
    INT32 x,
    INT32 y,
    const char *text,
    const XTextStyle *style,
    UINT32 color,
    const XTextRect *clip
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**x** &emsp;客户区坐标，单位像素。

&emsp;**y** &emsp;客户区坐标，单位像素。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**style** &emsp;文字样式结构体，或重点提示的样式编号。 结构见4-2-5-1。

&emsp;**color** &emsp;颜色，使用XAPI的RGBA表示。

&emsp;**clip** &emsp;裁剪矩形；为空时不指定额外裁剪矩形。 结构见4-2-5-3。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-2-5-8-1。

<a id="xapi-4-2-5-12"></a>

#### 4-2-5-12 xapi\_DrawTextTop();

该函数将会使用系统界面字体，按参考字符的顶部位置绘制文本。

**函数参数**

```cpp
void xapi_DrawTextTop(
    HDLE handle,
    INT32 x,
    INT32 y,
    WSTR text,
    UINT32 size,
    UINT32 color
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**x** &emsp;客户区坐标，单位像素。

&emsp;**y** &emsp;客户区坐标，单位像素。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**size** &emsp;文字大小；结构体字段中的**size**另有说明。

&emsp;**color** &emsp;颜色，使用XAPI的RGBA表示。

返回值 &emsp;无。

当前包装使用XTEXT\_ANCHOR\_REFERENCE及XTEXT\_REFERENCE\_AUTO，而不是XTEXT\_ANCHOR\_LINE\_TOP。需要明确的行顶部锚点时，请使用xapi\_DrawTextEx并自行设置XTextStyle。

本接口所用常量及相关状态说明请参见表格4-2-5-8-1。

<a id="xapi-4-2-5-13"></a>

#### 4-2-5-13 xapi\_DrawMonoTextTop();

该函数将会使用等宽字体，按参考字符的顶部位置绘制文本。

**函数参数**

```cpp
void xapi_DrawMonoTextTop(
    HDLE handle,
    INT32 x,
    INT32 y,
    WSTR text,
    UINT32 color
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**x** &emsp;客户区坐标，单位像素。

&emsp;**y** &emsp;客户区坐标，单位像素。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**color** &emsp;颜色，使用XAPI的RGBA表示。

返回值 &emsp;无。

本接口所用常量及相关状态说明请参见表格4-2-5-8-1。

<a id="xapi-4-2-5-14"></a>

#### 4-2-5-14 xapi\_DrawTextInRect();

该函数将会在指定矩形内放置文本，并裁剪超出矩形的部分。

**函数参数**

```cpp
void xapi_DrawTextInRect(
    HDLE handle,
    INT32 x,
    INT32 y,
    INT32 width,
    INT32 height,
    WSTR text,
    UINT32 size,
    UINT32 color
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**x** &emsp;客户区坐标，单位像素。

&emsp;**y** &emsp;客户区坐标，单位像素。

&emsp;**width** &emsp;宽度或高度，单位像素。

&emsp;**height** &emsp;宽度或高度，单位像素。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**size** &emsp;文字大小；结构体字段中的**size**另有说明。

&emsp;**color** &emsp;颜色，使用XAPI的RGBA表示。

返回值 &emsp;无。

本接口所用常量及相关状态说明请参见表格4-2-5-8-1。

<a id="xapi-4-2-6"></a>

### 4-2-6 xapi\_DrawSvg();

该函数将会绘制矢量图形。

**函数参数**

```cpp
INT32 xapi_DrawSvg(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    WSTR svgText,
    bool enableTrans
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;纵坐标。

&emsp;**width** &emsp;宽度。

&emsp;**svgText** &emsp;SVG字符串。

&emsp;**enableTrans** &emsp;是否反转RGB颜色；Alpha通道保持不变。

返回值 &emsp;成功返回高度，失败返回-1。

<a id="xapi-4-2-7"></a>

### 4-2-7 xapi\_DrawFA();

该函数将会绘制指定文件中的矢量图形。

**函数参数**

```cpp
INT32 xapi_DrawFA(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    char *name,
    bool enableTrans
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;纵坐标。

&emsp;**width** &emsp;宽度。

&emsp;**name** &emsp;要查询的HTTP响应头名称，不区分大小写。

&emsp;**enableTrans** &emsp;是否反转RGB颜色；Alpha通道保持不变。

返回值 &emsp;成功返回高度，失败返回-1。

<a id="xapi-4-3"></a>

## 4-3 插入图片

<a id="xapi-4-3-1"></a>

### 4-3-1 XCOLORA类型

该类型用于存储带Alpha通道的RGBA像素。

**类型结构**

```cpp
typedef struct XCOLORA
{
    UINT8 Red;
    UINT8 Green;
    UINT8 Blue;
    UINT8 Alpha;
} XCOLORA;
```

&emsp;**Red** &emsp;红、绿、蓝或Alpha通道，范围0至255。

&emsp;**Green** &emsp;红、绿、蓝或Alpha通道，范围0至255。

&emsp;**Blue** &emsp;红、绿、蓝或Alpha通道，范围0至255。

&emsp;**Alpha** &emsp;红、绿、蓝或**Alpha**通道，范围0至255。

<a id="xapi-4-3-2"></a>

### 4-3-2 xapi\_DrawBMP();

该函数将会在窗口上绘制BMP格式的图片。

**函数参数**

```cpp
void xapi_DrawBMP(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    UINT32 height,
    WSTR path
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;竖坐标。

&emsp;**width** &emsp;图片宽度。会进行拉伸。

&emsp;**height** &emsp;图片高度·。会进行拉伸。

&emsp;**path** &emsp;图片路径。

返回值 &emsp;无。

<a id="xapi-4-3-3"></a>

### 4-3-3 xapi\_DrawPNG();

该函数将会在窗口上绘制PNG格式的图片。

**函数参数**

```cpp
void xapi_DrawPNG(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    UINT32 height,
    WSTR path
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;竖坐标。

&emsp;**width** &emsp;图片宽度。会进行拉伸。

&emsp;**height** &emsp;图片高度·。会进行拉伸。

&emsp;**path** &emsp;图片路径。

返回值 &emsp;无。

<a id="xapi-4-3-4"></a>

### 4-3-4 xapi\_DrawPicture();

该函数将会在窗口上绘制PNG\\BMP\\JPEG\\GIF\\HDR格式的图片。

**函数参数**

```cpp
void xapi_DrawPicture(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    UINT32 height,
    WSTR path
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;竖坐标。

&emsp;**width** &emsp;图片宽度。会进行拉伸。

&emsp;**height** &emsp;图片高度·。会进行拉伸。

&emsp;**path** &emsp;图片路径。

返回值 &emsp;无。

<a id="xapi-4-3-5"></a>

### 4-3-5 xapi\_GetPicSize();

该函数将会读取PNG\\BMP\\JPEG\\GIF\\HDR格式的图片宽度和高度。

**函数参数**

```cpp
void xapi_GetPicSize(UINT32 *width, UINT32 *height, WSTR path);
```

&emsp;**width** &emsp;图片宽度。

&emsp;**height** &emsp;图片高度·。

&emsp;**path** &emsp;图片路径。

返回值 &emsp;无。

<a id="xapi-4-3-6"></a>

### 4-3-6 xapi\_LoadPicture();

该函数将会将PNG\\BMP\\JPEG\\GIF\\HDR格式的图片加载至内存。

**函数参数**

```cpp
bool xapi_LoadPicture(
    XCOLORA *buffer,
    UINT32 width,
    UINT32 height,
    WSTR path
);
```

&emsp;**buffer** &emsp;窗口句柄。 结构见4-3-1。

&emsp;**width** &emsp;图片宽度。会进行拉伸。

&emsp;**height** &emsp;图片高度·。会进行拉伸。

&emsp;**path** &emsp;图片路径。

返回值 &emsp;成功返回true，失败返回false。

<a id="xapi-4-4"></a>

## 4-4 消息处理

<a id="xapi-4-4-1"></a>

### 4-4-1 消息处理函数

程序通过SetMsgPrcor登记窗口消息处理函数。Type为消息类型，hData和lData各携带64位数据；具体含义由消息类型决定。

**函数参数**

```cpp
void SetMsgPrcor(HDLE handle, MsgPrcor func);
```

&emsp;**handle** &emsp;需要接收消息的窗口句柄。

&emsp;**func** &emsp;消息处理回调。MsgPrcor声明见1-3。

返回值 &emsp;无。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| MSG\_CHAR | 0 | 字符输入。 |
| MSG\_MOVE | 1 | 鼠标移动。 |
| MSG\_LBUTTON | 2 | 鼠标左键完成点击。 |
| MSG\_RBUTTON | 3 | 鼠标右键完成点击。 |
| MSG\_MBUTTON | 4 | 鼠标中键完成点击。 |
| MSG\_ROLLER | 5 | 鼠标滚轮滚动。 |
| MSG\_CRL | 6 | 控件操作。 |
| MSG\_SPCHAR | 7 | 特殊按键输入。 |
| MSG\_RESIZE | 8 | 窗口尺寸改变。 |
| MSG\_KEYUP | 9 | 按键释放。 |
| MSG\_KEYDOWN | 10 | 按键按下。 |
| MSG\_LBUTTONUP | 12 | 鼠标左键释放。 |
| MSG\_LBUTTON\_PRESS | 13 | 鼠标左键按下。 |
| MSG\_MBUTTON\_PRESS | 14 | 鼠标中键按下。 |
| MSG\_RBUTTON\_PRESS | 15 | 鼠标右键按下。 |
| MSG\_KEYLONGPRESS | 16 | 按键达到长按阈值。 |
| MSG\_ANIMATION | 17U | 动画快照更新。 |
| MSG\_PASTE | 19 | 粘贴请求。 |
| MSG\_EDIT | 18 | 编辑请求。 |

<a id="table-4-4-1-1"></a>

**表格4-4-1-1 窗口消息类型**

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XKEY\_ESC | 128 | ESC键。 |
| XKEY\_BACKSPACE | 129 | BACKSPACE键。 |
| XKEY\_TAB | 130 | TAB键。 |
| XKEY\_ENTER | 131 | ENTER键。 |
| XKEY\_CAPS | 132 | CAPS键。 |
| XKEY\_SHIFT | 133 | SHIFT键。 |
| XKEY\_CTRL | 134 | CTRL键。 |
| XKEY\_ALT | 135 | ALT键。 |
| XKEY\_SPACE | 136 | SPACE键。 |
| XKEY\_F1 | 137 | F1键。 |
| XKEY\_F2 | 138 | F2键。 |
| XKEY\_F3 | 139 | F3键。 |
| XKEY\_F4 | 140 | F4键。 |
| XKEY\_F5 | 141 | F5键。 |
| XKEY\_F6 | 142 | F6键。 |
| XKEY\_F7 | 143 | F7键。 |
| XKEY\_F8 | 144 | F8键。 |
| XKEY\_F9 | 145 | F9键。 |
| XKEY\_F10 | 146 | F10键。 |
| XKEY\_F11 | 147 | F11键。 |
| XKEY\_F12 | 148 | F12键。 |
| XKEY\_NUML | 149 | NUML键。 |
| XKEY\_SCROLL | 150 | SCROLL键。 |
| XKEY\_HOME | 151 | HOME键。 |
| XKEY\_UP | 152 | UP键。 |
| XKEY\_PAGE\_UP | 153 | PAGE\_UP键。 |
| XKEY\_LEFT | 154 | LEFT键。 |
| XKEY\_RIGHT | 155 | RIGHT键。 |
| XKEY\_END | 156 | END键。 |
| XKEY\_DOWN | 157 | DOWN键。 |
| XKEY\_PAGE\_DOWN | 158 | PAGE\_DOWN键。 |
| XKEY\_INSERT | 159 | INSERT键。 |
| XKEY\_DELETE | 160 | DELETE键。 |

<a id="table-4-4-1-2"></a>

**表格4-4-1-2 XAPI\_SPECIAL\_KEY**

<a id="xapi-4-4-2"></a>

### 4-4-2 键盘消息

<a id="xapi-4-4-2-1"></a>

#### 4-4-2-1 CHAR消息

代表有字符输入。lData携带一个打包的UTF-8字符。

消息识别码（宏）：MSG\_CHAR。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 保留。 |

**hData**

<a id="table-4-4-2-1-1"></a>

**表格4-4-2-1-1 hData数据**

`63                                               0`

|  |
| --- |
| UTF-8字符。 |

**lData**

<a id="table-4-4-2-1-2"></a>

**表格4-4-2-1-2 lData数据**

<a id="xapi-4-4-2-2"></a>

#### 4-4-2-2 SPCHAR消息

代表有特殊按键输入。

消息识别码（宏）：MSG\_SPCHAR。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 保留。 |

**hData**

<a id="table-4-4-2-2-1"></a>

**表格4-4-2-2-1 hData数据**

`63                                               0`

|  |
| --- |
| 特殊按键编号。 |

**lData**

<a id="table-4-4-2-2-2"></a>

**表格4-4-2-2-2 lData数据**

按键编号请参见表格4-4-1-2。

<a id="xapi-4-4-2-3"></a>

#### 4-4-2-3 KEYDOWN消息

代表有按键被按下，特殊按键也会发送。

消息识别码（宏）：MSG\_KEYDOWN。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 保留。 |

**hData**

<a id="table-4-4-2-3-1"></a>

**表格4-4-2-3-1 hData数据**

`63                                               0`

|  |
| --- |
| 按键编号。 |

**lData**

<a id="table-4-4-2-3-2"></a>

**表格4-4-2-3-2 lData数据**

按键编号请参见表格4-4-1-2。

<a id="xapi-4-4-2-4"></a>

#### 4-4-2-4 KEYUP消息

代表有按键被松开。

消息识别码（宏）：MSG\_KEYUP。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 保留。 |

**hData**

<a id="table-4-4-2-4-1"></a>

**表格4-4-2-4-1 hData数据**

`63                                               0`

|  |
| --- |
| 按键编号。 |

**lData**

<a id="table-4-4-2-4-2"></a>

**表格4-4-2-4-2 lData数据**

按键编号请参见表格4-4-1-2。

<a id="xapi-4-4-2-5"></a>

#### 4-4-2-5 KEYLONGPRESS消息

代表按键达到设置的长按阈值。当前实现每次按住最多触发一次长按通知。

消息识别码（宏）：MSG\_KEYLONGPRESS。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 保留。 |

**hData**

<a id="table-4-4-2-5-1"></a>

**表格4-4-2-5-1 hData数据**

`63                                               0`

|  |
| --- |
| 按键编号。 |

**lData**

<a id="table-4-4-2-5-2"></a>

**表格4-4-2-5-2 lData数据**

按键编号请参见表格4-4-1-2。

<a id="xapi-4-4-3"></a>

### 4-4-3 鼠标消息

<a id="xapi-4-4-3-1"></a>

#### 4-4-3-1 MOVE消息

代表鼠标移动。坐标相对于窗口客户区。

消息识别码（宏）：MSG\_MOVE。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-1-1"></a>

**表格4-4-3-1-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-1-2"></a>

**表格4-4-3-1-2 lData数据**

<a id="xapi-4-4-3-2"></a>

#### 4-4-3-2 LBUTTON消息

代表鼠标左键按下后完成一次点击。

消息识别码（宏）：MSG\_LBUTTON。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-2-1"></a>

**表格4-4-3-2-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-2-2"></a>

**表格4-4-3-2-2 lData数据**

<a id="xapi-4-4-3-3"></a>

#### 4-4-3-3 RBUTTON消息

代表鼠标右键按下后完成一次点击。

消息识别码（宏）：MSG\_RBUTTON。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-3-1"></a>

**表格4-4-3-3-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-3-2"></a>

**表格4-4-3-3-2 lData数据**

<a id="xapi-4-4-3-4"></a>

#### 4-4-3-4 MBUTTON消息

代表鼠标中键按下后完成一次点击。

消息识别码（宏）：MSG\_MBUTTON。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-4-1"></a>

**表格4-4-3-4-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-4-2"></a>

**表格4-4-3-4-2 lData数据**

<a id="xapi-4-4-3-5"></a>

#### 4-4-3-5 LBUTTON\_PRESS消息

代表鼠标左键被按下。

消息识别码（宏）：MSG\_LBUTTON\_PRESS。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-5-1"></a>

**表格4-4-3-5-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-5-2"></a>

**表格4-4-3-5-2 lData数据**

<a id="xapi-4-4-3-6"></a>

#### 4-4-3-6 RBUTTON\_PRESS消息

代表鼠标右键被按下。

消息识别码（宏）：MSG\_RBUTTON\_PRESS。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-6-1"></a>

**表格4-4-3-6-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-6-2"></a>

**表格4-4-3-6-2 lData数据**

<a id="xapi-4-4-3-7"></a>

#### 4-4-3-7 MBUTTON\_PRESS消息

代表鼠标中键被按下。

消息识别码（宏）：MSG\_MBUTTON\_PRESS。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-7-1"></a>

**表格4-4-3-7-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-7-2"></a>

**表格4-4-3-7-2 lData数据**

<a id="xapi-4-4-3-8"></a>

#### 4-4-3-8 ROLLER消息

代表鼠标滚轮发生滚动。

消息识别码（宏）：MSG\_ROLLER。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 高32位为X坐标，低32位为Y坐标。 |

**hData**

<a id="table-4-4-3-8-1"></a>

**表格4-4-3-8-1 hData数据**

`63                                               0`

|  |
| --- |
| 滚轮偏移，有符号值。 |

**lData**

<a id="table-4-4-3-8-2"></a>

**表格4-4-3-8-2 lData数据**

<a id="xapi-4-4-3-9"></a>

#### 4-4-3-9 LBUTTONUP消息

代表左键释放。消息发送到按下时所属窗口，即使指针已经移出窗口；坐标可能为负，应按有符号值解释。

消息识别码（宏）：MSG\_LBUTTONUP。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 鼠标X坐标。 |

**hData**

<a id="table-4-4-3-9-1"></a>

**表格4-4-3-9-1 hData数据**

`63                                               0`

|  |
| --- |
| 鼠标Y坐标。 |

**lData**

<a id="table-4-4-3-9-2"></a>

**表格4-4-3-9-2 lData数据**

<a id="xapi-4-4-4"></a>

### 4-4-4 控件消息

用于接收控件操作，例如按钮点击或开关状态改变。

消息识别码（宏）：MSG\_CRL。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 控件识别码。 |

**hData**

<a id="table-4-4-4-1"></a>

**表格4-4-4-1 hData数据**

`63                                               0`

|  |
| --- |
| 控件数据，其含义由控件决定。 |

**lData**

<a id="table-4-4-4-2"></a>

**表格4-4-4-2 lData数据**

<a id="xapi-4-4-5"></a>

### 4-4-5 刷新消息

窗口尺寸改变、需要重新绘制时发送。

消息识别码（宏）：MSG\_RESIZE。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 改变后的窗口宽度。 |

**hData**

<a id="table-4-4-5-1"></a>

**表格4-4-5-1 hData数据**

`63                                               0`

|  |
| --- |
| 改变后的窗口高度。 |

**lData**

<a id="table-4-4-5-2"></a>

**表格4-4-5-2 lData数据**

<a id="xapi-4-4-6"></a>

### 4-4-6 动画消息

动画状态更新通知。多个更新可能合并，请通过xapi\_AnimationQuery读取最新快照。

消息识别码（宏）：MSG\_ANIMATION。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 动画句柄。 |

**hData**

<a id="table-4-4-6-1"></a>

**表格4-4-6-1 hData数据**

`63                                               0`

|  |
| --- |
| 程序设置的tag。 |

**lData**

<a id="table-4-4-6-2"></a>

**表格4-4-6-2 lData数据**

<a id="xapi-4-4-7"></a>

### 4-4-7 剪切板消息

<a id="xapi-4-4-7-1"></a>

#### 4-4-7-1 PASTE消息

代表窗口收到粘贴请求。使用请求编号读取快照，处理结束后调用xapi\_FinishPaste。

消息识别码（宏）：MSG\_PASTE。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| 粘贴请求ID。 |

**hData**

<a id="table-4-4-7-1-1"></a>

**表格4-4-7-1-1 hData数据**

`63                                               0`

|  |
| --- |
| 目标控件ID。 |

**lData**

<a id="table-4-4-7-1-2"></a>

**表格4-4-7-1-2 lData数据**

<a id="xapi-4-4-7-2"></a>

#### 4-4-7-2 EDIT消息

代表窗口收到复制、剪切或全选请求。处理方式参见剪贴板接口。

消息识别码（宏）：MSG\_EDIT。参见表格4-4-1-1。

**数据分布结构：**

`63                                               0`

|  |
| --- |
| XCLIP\_EDIT\_\*操作类型。 |

**hData**

<a id="table-4-4-7-2-1"></a>

**表格4-4-7-2-1 hData数据**

`63                                               0`

|  |
| --- |
| 编辑请求ID。 |

**lData**

<a id="table-4-4-7-2-2"></a>

**表格4-4-7-2-2 lData数据**

编辑动作请参见表格4-8-12-1。

<a id="xapi-4-5"></a>

## 4-5 对framebuffer进行操作

<a id="xapi-4-5-1"></a>

### 4-5-1 XCOLOR类型

该类型用于存储不带Alpha通道的RGB像素。

**类型结构**

```cpp
#pragma pack(1)
typedef struct XCOLOR
{
    UINT8 Red;
    UINT8 Green;
    UINT8 Blue;
} XCOLOR;
#pragma pack()
```

&emsp;**Red** &emsp;红、绿、蓝或Alpha通道，范围0至255。

&emsp;**Green** &emsp;红、绿、蓝或Alpha通道，范围0至255。

&emsp;**Blue** &emsp;红、绿、蓝或Alpha通道，范围0至255。

<a id="xapi-4-5-2"></a>

### 4-5-2 xapi\_ReadBuffer();

该函数将会获取framebuffer中的指定区域。

**函数参数**

```cpp
void xapi_ReadBuffer(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    UINT32 height,
    XCOLOR* buffer
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;起始横坐标。

&emsp;**y** &emsp;起始竖坐标。

&emsp;**width** &emsp;宽度。

&emsp;**height** &emsp;高度。

&emsp;**buffer** &emsp;图像。 结构见4-5-1。

返回值 &emsp;无。

<a id="xapi-4-5-3"></a>

### 4-5-3 xapi\_WriteBuffer();

该函数将会写入framebuffer中的指定区域。

**函数参数**

```cpp
void xapi_WriteBuffer(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    UINT32 height,
    XCOLOR* buffer
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;起始横坐标。

&emsp;**y** &emsp;起始竖坐标。

&emsp;**width** &emsp;宽度。

&emsp;**height** &emsp;高度。

&emsp;**buffer** &emsp;图像。 结构见4-5-1。

返回值 &emsp;无。

<a id="xapi-4-5-4"></a>

### 4-5-4 xapi\_ReadBufferA();

该函数将会获取framebuffer中的指定区域（包含透明色）。

**函数参数**

```cpp
void xapi_ReadBufferA(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    UINT32 height,
    XCOLOR* buffer
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;起始横坐标。

&emsp;**y** &emsp;起始竖坐标。

&emsp;**width** &emsp;宽度。

&emsp;**height** &emsp;高度。

&emsp;**buffer** &emsp;图像。 结构见4-5-1。

返回值 &emsp;无。

<a id="xapi-4-5-5"></a>

### 4-5-5 xapi\_WriteBufferA();

该函数将会写入framebuffer中的指定区域（包含透明色）。

**函数参数**

```cpp
void xapi_WriteBufferA(
    HDLE handle,
    UINT32 x,
    UINT32 y,
    UINT32 width,
    UINT32 height,
    XCOLORA* buffer
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;起始横坐标。

&emsp;**y** &emsp;起始竖坐标。

&emsp;**width** &emsp;宽度。

&emsp;**height** &emsp;高度。

&emsp;**buffer** &emsp;图像（含Alpha通道）。 结构见4-3-1。

返回值 &emsp;无。

<a id="xapi-4-5-6"></a>

### 4-5-6 xapi\_RefreshWindow();

该函数将会刷新整个窗口。

**函数参数**

```cpp
void xapi_RefreshWindow(HDLE handle);
```

&emsp;**handle** &emsp;窗口句柄。

返回值 &emsp;无。

<a id="xapi-4-5-7"></a>

### 4-5-7 xapi\_RefreshPartWindow();

该函数将会刷新部分窗口。

**函数参数**

```cpp
void xapi_RefreshPartWindow(
    HDLE handle,
    UINT32 x1,
    UINT32 y1,
    UINT32 x2,
    UINT32 y2
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x1** &emsp;起始横坐标。

&emsp;**y1** &emsp;起始竖坐标。

&emsp;**x2** &emsp;结束横坐标。

&emsp;**y2** &emsp;结束竖坐标。

返回值 &emsp;无。

<a id="xapi-4-6"></a>

## 4-6 控件

<a id="xapi-4-6-1"></a>

### 4-6-1 按钮控件

<a id="xapi-4-6-1-1"></a>

#### 4-6-1-1 xapi\_Button();

该函数将会在窗口上创建一个按钮控件。高度为28像素，宽度为文本宽度+30像素，文本居中放置。

**函数参数**

```cpp
void xapi_Button(
    HDLE handle,
    UINT64 CRLid,
    UINT64 x,
    UINT64 y,
    WSTR text
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**CRLid** &emsp;控件识别码。

&emsp;**x** &emsp;按钮左上角X坐标。

&emsp;**y** &emsp;按钮左上角Y坐标。

&emsp;**text** &emsp;文本。

返回值 &emsp;无。

<a id="xapi-4-6-1-2"></a>

#### 4-6-1-2 xapi\_ButtonEmp();

该函数将会在窗口上创建一个蓝色按钮控件（可用于突出强调选项）。高度为28像素，宽度为文本宽度+30像素，文本居中放置。

**函数参数**

```cpp
void xapi_ButtonEmp(
    HDLE handle,
    UINT64 CRLid,
    UINT64 x,
    UINT64 y,
    WSTR text
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**CRLid** &emsp;控件识别码。

&emsp;**x** &emsp;按钮左上角X坐标。

&emsp;**y** &emsp;按钮左上角Y坐标。

&emsp;**text** &emsp;文本。

返回值 &emsp;无。

<a id="xapi-4-6-1-3"></a>

#### 4-6-1-3 xapi\_DeleteButton();

该函数将删除指定按钮（如果有多个对应识别码的按钮则删除最先创建的），但不会对按钮所在区域进行擦除。

**函数参数**

```cpp
void xapi_DeleteButton(HDLE handle, UINT64 CRLid);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**CRLid** &emsp;控件识别码

返回值 &emsp;无。

<a id="xapi-4-6-2"></a>

### 4-6-2 右键菜单控件

<a id="xapi-4-6-2-1"></a>

#### 4-6-2-1 RightMenuItem类型

该类型用于存储右键菜单中的一个项目。

**类型结构**

```cpp
typedef struct
{
    UINT64  CRLid;
    WSTR    text;
} RightMenuItem;
```

&emsp;**CRLid** &emsp;控件识别码。

&emsp;**text** &emsp;UTF-8文本。

<a id="xapi-4-6-2-2"></a>

#### 4-6-2-2 xapi\_RegisterRightButtonMenu();

该函数将会登记一个右键菜单。（不适用于全屏应用程序）

**函数参数**

```cpp
void xapi_RegisterRightButtonMenu(
    HDLE handle,
    RightMenuItem *items,
    UINT64 count
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**items** &emsp;条目数组。控件接口中表示完整的目标控件布局。 结构见4-6-2-1。

&emsp;**count** &emsp;目录项数量。

返回值 &emsp;无。

<a id="xapi-4-6-2-3"></a>

#### 4-6-2-3 xapi\_DeleteRightButtonMenu();

该函数将会删除登记的右键菜单。

**函数参数**

```cpp
void xapi_DeleteRightButtonMenu(HDLE handle);
```

&emsp;**handle** &emsp;窗口句柄。

返回值 &emsp;无。

<a id="xapi-4-6-3"></a>

### 4-6-3 文本输入框控件

<a id="xapi-4-6-3-1"></a>

#### 4-6-3-1 xapi\_PutTextInputBox();

该函数将会放置一个文本输入框。

**函数参数**

```cpp
UINT64 xapi_PutTextInputBox(
    HDLE handle,
    UINT64 x,
    UINT64 y,
    UINT64 width,
    WSTR text
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;纵坐标。

&emsp;**width** &emsp;文本框长度。

&emsp;**text** &emsp;文本框默认文本。

返回值 &emsp;输入框ID

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XAPI\_TEXT\_INPUT\_BOX\_BUFFER\_SIZE | 256 | 输入框文本缓冲区容量。 |

<a id="table-4-6-3-1-1"></a>

**表格4-6-3-1-1 输入框文本容量**

<a id="xapi-4-6-3-2"></a>

#### 4-6-3-2 xapi\_GetTextInputBox();

该函数将会获取输入框中输入的文本。

**函数参数**

```cpp
void xapi_GetTextInputBox(UINT64 id, WSTR text);
```

&emsp;**id** &emsp;输入框ID。

&emsp;**text** &emsp;UTF-8文本字符串。

返回值 &emsp;无。

<a id="xapi-4-6-3-3"></a>

#### 4-6-3-3 xapi\_DeleteTextInputBox();

该函数将会删除输入框。

**函数参数**

```cpp
void xapi_DeleteTextInputBox(UINT64 id);
```

&emsp;**id** &emsp;输入框ID。

返回值 &emsp;无。

<a id="xapi-4-6-4"></a>

### 4-6-4 单模开关控件

<a id="xapi-4-6-4-1"></a>

#### 4-6-4-1 xapi\_PutSwitch();

该函数将会放置一个开关，当用户切换开关状态时会发送一个控件消息。

**函数参数**

```cpp
void xapi_PutSwitch(
    HDLE handle,
    UINT64 x,
    UINT64 y,
    UINT64 status,
    UINT64 CRLid
);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**x** &emsp;横坐标。

&emsp;**y** &emsp;纵坐标。

&emsp;**status** &emsp;开关状态（0=关，1=开）。

&emsp;**CRLid** &emsp;控件识别码。

返回值 &emsp;无。

<a id="xapi-4-6-4-2"></a>

#### 4-6-4-2 xapi\_SetSwitch();

该函数将会设置开关为指定状态。

**函数参数**

```cpp
void xapi_SetSwitch(HDLE handle, UINT64 CRLid, UINT64 status);
```

&emsp;**handle** &emsp;窗口句柄。

&emsp;**CRLid** &emsp;控件识别码。

&emsp;**status** &emsp;用于接收当前状态的结构体指针。

返回值 &emsp;无。

<a id="xapi-4-6-4-3"></a>

#### 4-6-4-3 xapi\_DeleteSwitch();

该函数将会删除按钮。

**函数参数**

```cpp
void xapi_DeleteSwitch(HDLE handle, UINT64 CRLid);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**CRLid** &emsp;控件识别码。

返回值 &emsp;无。

<a id="xapi-4-6-5"></a>

### 4-6-5 滚动条

<a id="xapi-4-6-5-1"></a>

#### 4-6-5-1 xapi\_PutVerticalScrollBar();

该函数将会创建一个垂直滚动条，指定滚动条长度、滑块长度及控件识别码。

**函数参数**

```cpp
void xapi_PutVerticalScrollBar(
    HDLE handle,
    UINT64 x,
    UINT64 y,
    UINT64 length,
    UINT64 thumbLength,
    UINT64 CRLid
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**x** &emsp;客户区坐标，单位像素。

&emsp;**y** &emsp;客户区坐标，单位像素。

&emsp;**length** &emsp;滚动条长度，单位像素。

&emsp;**thumbLength** &emsp;滑块长度，单位像素。

&emsp;**CRLid** &emsp;控件识别码。

返回值 &emsp;无。

<a id="xapi-4-6-5-2"></a>

#### 4-6-5-2 xapi\_PutHorizontalScrollBar();

该函数将会创建一个水平滚动条，指定滚动条长度、滑块长度及控件识别码。

**函数参数**

```cpp
void xapi_PutHorizontalScrollBar(
    HDLE handle,
    UINT64 x,
    UINT64 y,
    UINT64 length,
    UINT64 thumbLength,
    UINT64 CRLid
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**x** &emsp;客户区坐标，单位像素。

&emsp;**y** &emsp;客户区坐标，单位像素。

&emsp;**length** &emsp;滚动条长度，单位像素。

&emsp;**thumbLength** &emsp;滑块长度，单位像素。

&emsp;**CRLid** &emsp;控件识别码。

返回值 &emsp;无。

<a id="xapi-4-6-5-3"></a>

#### 4-6-5-3 xapi\_DeleteScrollBar();

该函数将会删除指定窗口中的滚动条控件。

**函数参数**

```cpp
void xapi_DeleteScrollBar(HDLE handle, UINT64 CRLid);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**CRLid** &emsp;控件识别码。

返回值 &emsp;无。

<a id="xapi-4-6-5-4"></a>

#### 4-6-5-4 xapi\_SetScrollBarPosition();

该函数将会设置指定滚动条的滑块位置。

**函数参数**

```cpp
void xapi_SetScrollBarPosition(
    HDLE handle,
    UINT64 CRLid,
    UINT64 position
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**CRLid** &emsp;控件识别码。

&emsp;**position** &emsp;滑块位置。

返回值 &emsp;无。

<a id="xapi-4-7"></a>

## 4-7 动画

<a id="xapi-4-7-1"></a>

### 4-7-1 XAnimCurve类型

该类型用于存储动画插值曲线。

**类型结构**

```cpp
typedef struct XAnimCurve
{
    XAnimU32 id;
    XAnimU32 reserved;
    XAnimI32 params[4];
} XAnimCurve;
```

&emsp;**id** &emsp;标识或曲线编号。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**params** &emsp;曲线参数；当前V1曲线全部置零。

<a id="xapi-4-7-2"></a>

### 4-7-2 XAnimDesc类型

该类型用于存储一个动画的目标、时间和起止值。

**类型结构**

```cpp
typedef struct XAnimDesc
{
    XAnimU32   size;
    XAnimU32   version;
    XAnimU32   target;
    XAnimU32   flags;
    XAnimU64   window;
    XAnimU64   tag;
    XAnimU64   duration_ms;
    XAnimU64   delay_ms;
    XAnimCurve curve;
    XAnimU32   value_count;
    XAnimU32   reserved;
    XAnimI32   from[XANIM_VALUE_LIMIT];
    XAnimI32   to[XANIM_VALUE_LIMIT];
    XAnimU64   reserved64[2];
} XAnimDesc;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**target** &emsp;动画目标类型。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**window** &emsp;所属窗口或控件编号。

&emsp;**tag** &emsp;由程序提供并原样返回的标记值。

&emsp;**duration\_ms** &emsp;动画持续时间或开始前延迟，单位毫秒。

&emsp;**delay\_ms** &emsp;动画持续时间或开始前延迟，单位毫秒。

&emsp;**curve** &emsp;动画曲线说明。

&emsp;**value\_count** &emsp;有效数值数量。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**from** &emsp;动画起点和终点数值数组。

&emsp;**to** &emsp;动画起点和终点数值数组。

&emsp;**reserved64** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-7-3"></a>

### 4-7-3 XAnimSnapshot类型

该类型用于存储动画已发布的状态和值。

**类型结构**

```cpp
typedef struct XAnimSnapshot
{
    XAnimU32    size;
    XAnimU32    version;
    XAnimU32    state;
    XAnimU32    value_count;
    XAnimHandle handle;
    XAnimU64    tag;
    XAnimU64    elapsed_ms;
    XAnimU32    progress;
    XAnimU32    reserved;
    XAnimI32    values[XANIM_VALUE_LIMIT];
    XAnimU64    sequence;
    XAnimU64    reserved64;
} XAnimSnapshot;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**state** &emsp;对象当前状态，使用对应接口的状态常量。

&emsp;**value\_count** &emsp;有效数值数量。

&emsp;**handle** &emsp;对象句柄。

&emsp;**tag** &emsp;由程序提供并原样返回的标记值。

&emsp;**elapsed\_ms** &emsp;已经经过的动画时间，单位毫秒。

&emsp;**progress** &emsp;线性时间进度，范围0至XANIM\_PROGRESS\_ONE。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**values** &emsp;当前插值后的数值数组。

&emsp;**sequence** &emsp;事件或快照序列号，用于识别更新。

&emsp;**reserved64** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-7-4"></a>

### 4-7-4 xapi\_AnimationStart();

该函数将会为指定窗口创建动画。系统可以移动窗口，也可以计算供程序自行绘制的一组整数值。

**函数参数**

```cpp
XAnimResult xapi_AnimationStart(
    const XAnimDesc *description,
    XAnimHandle *handle
);
```

&emsp;**description** &emsp;描述本次操作的输入结构体指针。 结构见4-7-2。

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

返回值 &emsp;成功返回0，失败返回负errno。

结构体的size/version须初始化，保留字段及未使用数值置零。窗口位置目标使用两个有符号屏幕坐标；值动画支持1至4个整数。duration\_ms为0时，在延迟结束后直接应用终值。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XANIM\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XANIM\_VALUE\_LIMIT | 4U | 单个动画允许的数值数量上限。 |
| XANIM\_PROGRESS\_ONE | 65536U | 完整进度，Q16值65536。 |
| XANIM\_MAX\_TIME\_MS | 86400000ULL | 动画时间上限，单位毫秒。 |
| XANIM\_LINEAR | 0U | 线性插值。 |
| XANIM\_EASE\_OUT\_CUBIC | 1U | 三次缓出插值，接近终点时减速。 |
| XANIM\_TARGET\_WINDOW\_POSITION | 1U | 对窗口左上角屏幕坐标做动画。 |
| XANIM\_TARGET\_VALUE | 2U | 对应用自定义整数值做动画。 |
| XANIM\_FROM\_CURRENT | 1U | 使用窗口当前位置作为起点。 |
| XANIM\_NOTIFY | 2U | 向窗口发送动画更新通知。 |

<a id="table-4-7-4-1"></a>

**表格4-7-4-1 动画配置和曲线**

<a id="xapi-4-7-5"></a>

### 4-7-5 xapi\_AnimationControl();

该函数将会暂停、恢复、取消动画，或直接应用动画的最终值。

**函数参数**

```cpp
XAnimResult xapi_AnimationControl(
    XAnimHandle handle,
    XAnimU32 operation
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**operation** &emsp;动画或数据管理操作编号。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XANIM\_PAUSE | 1U | 暂停并保留进度。 |
| XANIM\_RESUME | 2U | 恢复运行。 |
| XANIM\_CANCEL | 3U | 取消操作并保留当前位置。 |
| XANIM\_FINISH | 4U | 立即应用最终值。 |

<a id="table-4-7-5-1"></a>

**表格4-7-5-1 动画控制命令**

本接口所用常量及相关状态说明请参见表格4-7-4-1。

<a id="xapi-4-7-6"></a>

### 4-7-6 xapi\_AnimationQuery();

该函数将会读取动画最新发布的状态和数值快照。中间帧的通知可能被合并。

**函数参数**

```cpp
XAnimResult xapi_AnimationQuery(
    XAnimHandle handle,
    XAnimSnapshot *snapshot
);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

&emsp;**snapshot** &emsp;用于接收动画状态快照的结构体。 结构见4-7-3。

返回值 &emsp;成功返回0，失败返回负errno。

动画完成或取消后仍可查询，直到Release。消息可能合并，snapshot中的state用于判断是否结束。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XANIM\_PENDING | 0U | 等待开始或延迟结束。 |
| XANIM\_RUNNING | 1U | 正在运行或播放。 |
| XANIM\_PAUSED | 2U | 已经暂停。 |
| XANIM\_COMPLETED | 3U | 操作已经完成。 |
| XANIM\_CANCELLED | 4U | 操作已经取消。 |

<a id="table-4-7-6-1"></a>

**表格4-7-6-1 动画状态**

本接口所用常量及相关状态说明请参见表格4-7-4-1。

<a id="xapi-4-7-7"></a>

### 4-7-7 xapi\_AnimationRelease();

该函数将会释放动画记录并使句柄失效。尚未结束的动画会被取消。

**函数参数**

```cpp
XAnimResult xapi_AnimationRelease(XAnimHandle handle);
```

&emsp;**handle** &emsp;操作对象的句柄，具体对象类型以函数声明为准。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-7-4-1。

<a id="xapi-4-8"></a>

## 4-8 剪切板和文本选择

<a id="xapi-4-8-1"></a>

### 4-8-1 XClipData类型

该类型用于存储剪贴板的一份格式数据。

**类型结构**

```cpp
typedef struct XClipData
{
    XClipU32 format, reserved;
    XClipU64 data, bytes;
} XClipData;
```

&emsp;**format** &emsp;数据格式编号。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**data** &emsp;发布数据的用户地址，系统不会长期保留此指针。

&emsp;**bytes** &emsp;数据长度，单位字节。

<a id="xapi-4-8-2"></a>

### 4-8-2 XClipOffer类型

该类型用于存储一次剪贴板发布包含的全部格式。

**类型结构**

```cpp
typedef struct XClipOffer
{
    XClipU32  size, version, count, reserved;
    XClipData entries[XCLIP_FORMAT_LIMIT];
} XClipOffer;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**count** &emsp;有效条目数量。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**entries** &emsp;条目数组。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-8-3"></a>

### 4-8-3 XClipImage类型

该类型用于存储剪贴板RGBA8图像的数据头。

**类型结构**

```cpp
typedef struct XClipImage
{
    XClipU32 size, version, width, height, stride, reserved;
} XClipImage;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**width** &emsp;宽度或高度，单位像素。

&emsp;**height** &emsp;宽度或高度，单位像素。

&emsp;**stride** &emsp;图像每行占用的字节数。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

数据头之后紧接height × stride字节的RGBA像素，使用直通Alpha，自顶行起排列。

<a id="xapi-4-8-4"></a>

### 4-8-4 XClipFiles类型

该类型用于存储剪贴板文件列表的数据头。

**类型结构**

```cpp
typedef struct XClipFiles
{
    XClipU32 size, version, count, operation;
} XClipFiles;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**count** &emsp;有效条目数量。

&emsp;**operation** &emsp;文件或用户数据操作编号。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

数据头之后为count个XClipPath记录及以空字符结尾的绝对UTF-8路径。

<a id="xapi-4-8-5"></a>

### 4-8-5 XClipPath类型

该类型用于存储文件列表中一个路径的偏移和长度。

**类型结构**

```cpp
typedef struct XClipPath
{
    XClipU32 offset, bytes;
} XClipPath;
```

&emsp;**offset** &emsp;相对于XClipFiles数据头的路径起始偏移。

&emsp;**bytes** &emsp;路径字节数，包含结尾空字符。

<a id="xapi-4-8-6"></a>

### 4-8-6 XClipFormat类型

该类型用于存储剪贴板格式及其数据长度。

**类型结构**

```cpp
typedef struct XClipFormat
{
    XClipU32 format, reserved;
    XClipU64 bytes;
} XClipFormat;
```

&emsp;**format** &emsp;数据格式编号。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**bytes** &emsp;数据长度，单位字节。

<a id="xapi-4-8-7"></a>

### 4-8-7 XClipInfo类型

该类型用于存储剪贴板或粘贴请求的格式快照。

**类型结构**

```cpp
typedef struct XClipInfo
{
    XClipU32    size, version, count, reserved;
    XClipU64    revision, window, control;
    XClipFormat entries[XCLIP_FORMAT_LIMIT];
} XClipInfo;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**count** &emsp;有效条目数量。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**revision** &emsp;快照或候选内容的修订编号。

&emsp;**window** &emsp;所属窗口或控件编号。

&emsp;**control** &emsp;所属窗口或控件编号。

&emsp;**entries** &emsp;条目数组。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-8-8"></a>

### 4-8-8 XTextSelection类型

该类型用于存储文本选区方向和光标位置。

**类型结构**

```cpp
typedef struct XTextSelection
{
    XClipU32 size, version;
    XClipU64 anchor, cursor;
} XTextSelection;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**anchor** &emsp;选区锚点，以UTF-8字节偏移计。

&emsp;**cursor** &emsp;文本光标位置，以UTF-8字节计。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-8-9"></a>

### 4-8-9 xapi\_ClipboardSetText();

该函数将会把UTF-8文本复制到系统剪贴板。空文本也可以发布。

**函数参数**

```cpp
XClipResult xapi_ClipboardSetText(
    const char *text,
    XClipU64 bytes
);
```

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**bytes** &emsp;数据长度，单位字节。

返回值 &emsp;成功返回正的剪贴板修订编号，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XCLIP\_TEXT | 1U | UTF-8文本格式。 |
| XCLIP\_TEXT\_LIMIT | 1048576U | 文本字节数上限。 |

<a id="table-4-8-9-1"></a>

**表格4-8-9-1 剪贴板文本**

本接口所用常量及相关状态说明请参见表格4-8-10-1。

<a id="xapi-4-8-10"></a>

### 4-8-10 xapi\_ClipboardSetData();

该函数将会一次发布一种或多种剪贴板格式。系统在调用期间复制数据，不会保留调用者的指针。

**函数参数**

```cpp
XClipResult xapi_ClipboardSetData(const XClipOffer *offer);
```

&emsp;**offer** &emsp;需要发布的剪贴板格式和数据集合。 结构见4-8-2。

返回值 &emsp;成功返回正的剪贴板修订编号，失败返回负errno。

图像为直通Alpha的RGBA8，自顶行起存放；文件列表包含路径记录及以空字符结尾的绝对UTF-8路径。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XCLIP\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XCLIP\_RGBA8 | 2U | 每通道8位的RGBA图像。 |
| XCLIP\_FILES | 3U | 文件路径列表格式。 |
| XCLIP\_FORMAT\_BIT(format) | (1U &lt;&lt; ((format) - 1U)) | 把格式编号转换为格式位。 |
| XCLIP\_ALL\_FORMATS | 7U | 全部已定义的剪贴板格式位。 |
| XCLIP\_FORMAT\_LIMIT | 8U | 格式条目数量上限。 |
| XCLIP\_DATA\_LIMIT | 67108864ULL | 总数据字节数上限。 |
| XCLIP\_FILE\_LIMIT | 256U | 文件条目数量上限。 |
| XCLIP\_PATH\_LIMIT | 4096U | 路径字节数上限。 |
| XCLIP\_FILE\_COPY | 0U | 复制文件。 |
| XCLIP\_FILE\_MOVE | 1U | 移动文件。 |

<a id="table-4-8-10-1"></a>

**表格4-8-10-1 剪贴板版本、格式和容量**

<a id="xapi-4-8-11"></a>

### 4-8-11 xapi\_ClipboardQuery();

该函数将会读取剪贴板当前版本和各格式的数据长度，不会返回数据本身。

**函数参数**

```cpp
XClipResult xapi_ClipboardQuery(XClipInfo *info);
```

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见4-8-7。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-8-9-1、表格4-8-10-1。

<a id="xapi-4-8-12"></a>

### 4-8-12 xapi\_ClipboardAttach();

该函数将会为窗口启用标准或终端剪贴板行为，并声明可接收的数据格式。

**函数参数**

```cpp
XClipResult xapi_ClipboardAttach(
    XClipU64 window,
    XClipU32 profile,
    XClipU32 formats
);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**profile** &emsp;窗口剪贴板行为，选择标准或终端方式。

&emsp;**formats** &emsp;窗口接受的剪贴板格式位集合。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XCLIP\_STANDARD | 1U | 标准应用剪贴板快捷键行为。 |
| XCLIP\_TERMINAL | 2U | 终端剪贴板快捷键行为。 |
| XCLIP\_EDIT\_COPY | 1U | 复制选中内容。 |
| XCLIP\_EDIT\_CUT | 2U | 剪切选中内容。 |
| XCLIP\_EDIT\_SELECT\_ALL | 3U | 全选内容。 |

<a id="table-4-8-12-1"></a>

**表格4-8-12-1 剪贴板行为和编辑动作**

本接口所用常量及相关状态说明请参见表格4-8-9-1、表格4-8-10-1。

<a id="xapi-4-8-13"></a>

### 4-8-13 xapi\_RequestPaste();

该函数将会为指定窗口和控件发起粘贴请求。程序通过窗口消息收到请求编号。

**函数参数**

```cpp
XClipResult xapi_RequestPaste(XClipU64 window, XClipU64 control);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**control** &emsp;目标文本输入框或其他控件的编号。

返回值 &emsp;自绘控件成功返回正的请求ID；原生文本框直接执行粘贴并返回其结果；失败返回负errno。

control为0时可以使用当前原生文本框；原生文本框由系统直接处理，自绘控件通过MSG\_PASTE取得请求。

本接口所用常量及相关状态说明请参见表格4-8-10-1。

<a id="xapi-4-8-14"></a>

### 4-8-14 xapi\_GetPasteInfo();

该函数将会读取一次粘贴请求包含的格式、长度及目标窗口和控件信息。

**函数参数**

```cpp
XClipResult xapi_GetPasteInfo(XClipU64 paste, XClipInfo *info);
```

&emsp;**paste** &emsp;粘贴或编辑请求编号。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见4-8-7。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-8-9-1、表格4-8-10-1。

<a id="xapi-4-8-15"></a>

### 4-8-15 xapi\_ReadPaste();

该函数将会读取粘贴请求中的指定格式。读取的是请求建立时的快照，不会受之后复制操作的影响。

**函数参数**

```cpp
XClipResult xapi_ReadPaste(
    XClipU64 paste,
    XClipU32 format,
    void *buffer,
    XClipU64 capacity
);
```

&emsp;**paste** &emsp;粘贴或编辑请求编号。

&emsp;**format** &emsp;要读取的数据格式。

&emsp;**buffer** &emsp;用于接收输出数据的可写缓冲区。

&emsp;**capacity** &emsp;输出缓冲区容量，单位字节。

返回值 &emsp;成功返回复制的字节数，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-8-9-1、表格4-8-10-1。

<a id="xapi-4-8-16"></a>

### 4-8-16 xapi\_FinishPaste();

该函数将会结束一次粘贴或编辑请求，并告知系统处理结果。

**函数参数**

```cpp
XClipResult xapi_FinishPaste(XClipU64 paste, XClipU32 result);
```

&emsp;**paste** &emsp;粘贴或编辑请求编号。

&emsp;**result** &emsp;请求处理结果标志。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XCLIP\_FINISH\_MOVED | 1U | 报告文件移动已完成。 |

<a id="table-4-8-16-1"></a>

**表格4-8-16-1 粘贴完成结果**

本接口所用常量及相关状态说明请参见表格4-8-10-1。

<a id="xapi-4-8-17"></a>

### 4-8-17 xapi\_ClipboardClaimMove();

该函数将会为文件剪切粘贴取得移动资格，避免同一份移动请求被重复执行。

**函数参数**

```cpp
XClipResult xapi_ClipboardClaimMove(XClipU64 paste);
```

&emsp;**paste** &emsp;粘贴或编辑请求编号。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-8-10-1、表格4-8-16-1。

<a id="xapi-4-8-18"></a>

### 4-8-18 xapi\_TextInputGetSelection();

该函数将会获取文本输入框当前选区的起点和光标位置。

**函数参数**

```cpp
XClipResult xapi_TextInputGetSelection(
    XClipU64 window,
    XClipU64 control,
    XTextSelection *selection
);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**control** &emsp;目标文本输入框或其他控件的编号。

&emsp;**selection** &emsp;文本选区结构体，位置以UTF-8字节计。 结构见4-8-8。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-8-10-1。

<a id="xapi-4-8-19"></a>

### 4-8-19 xapi\_TextInputSetSelection();

该函数将会设置文本输入框选区。位置以UTF-8字节偏移计，并保留选区方向。

**函数参数**

```cpp
XClipResult xapi_TextInputSetSelection(
    XClipU64 window,
    XClipU64 control,
    const XTextSelection *selection
);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**control** &emsp;目标文本输入框或其他控件的编号。

&emsp;**selection** &emsp;文本选区结构体，位置以UTF-8字节计。 结构见4-8-8。

返回值 &emsp;成功返回0，失败返回负errno。

anchor与cursor使用UTF-8字节偏移，不能指向多字节字符中间。

本接口所用常量及相关状态说明请参见表格4-8-10-1。

<a id="xapi-4-8-20"></a>

### 4-8-20 xapi\_TextInputSetFlags();

该函数将会设置文本输入框的只读或密码标志。

**函数参数**

```cpp
XClipResult xapi_TextInputSetFlags(
    XClipU64 window,
    XClipU64 control,
    XClipU32 flags
);
```

&emsp;**window** &emsp;窗口句柄。

&emsp;**control** &emsp;目标文本输入框或其他控件的编号。

&emsp;**flags** &emsp;本次操作的标志位。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XTEXT\_READ\_ONLY | 1U | 文本框只读。 |
| XTEXT\_PASSWORD | 2U | 文本框包含密码内容。 |

<a id="table-4-8-20-1"></a>

**表格4-8-20-1 文本输入标志**

本接口所用常量及相关状态说明请参见表格4-8-10-1。

<a id="xapi-4-9"></a>

## 4-9 输入法

<a id="xapi-4-9-1"></a>

### 4-9-1 XImeRegistration类型

该类型用于存储输入法注册的标识和名称。

**类型结构**

```cpp
typedef struct XImeRegistration
{
    XImeU32 size, version;
    char    id[XIME_ID_BYTES];
    char    name[XIME_NAME_BYTES];
} XImeRegistration;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**id** &emsp;标识或曲线编号。

&emsp;**name** &emsp;名称字符串。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-2"></a>

### 4-9-2 XImeInfo类型

该类型用于存储已安装输入法的信息。

**类型结构**

```cpp
typedef struct XImeInfo
{
    char id[XIME_ID_BYTES];
    char name[XIME_NAME_BYTES];
    char executable[XIME_PATH_BYTES];
} XImeInfo;
```

&emsp;**id** &emsp;标识或曲线编号。

&emsp;**name** &emsp;名称字符串。

&emsp;**executable** &emsp;输入法可执行文件路径。

<a id="xapi-4-9-3"></a>

### 4-9-3 XImeList类型

该类型用于存储已安装输入法的列表。

**类型结构**

```cpp
typedef struct XImeList
{
    XImeU32  size, version, count, reserved;
    XImeInfo entries[XIME_MAX_INSTALLED];
} XImeList;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**count** &emsp;有效条目数量。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**entries** &emsp;条目数组。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-4"></a>

### 4-9-4 XImeState类型

该类型用于存储输入法当前状态。

**类型结构**

```cpp
typedef struct XImeState
{
    XImeU32 size, version, mode, attached;
    char    active[XIME_ID_BYTES];
} XImeState;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**mode** &emsp;英文或中文输入模式。

&emsp;**attached** &emsp;输入法会话是否已连接。

&emsp;**active** &emsp;当前活动输入法的标识，空字符串表示直接输入。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-5"></a>

### 4-9-5 XImeSelect类型

该类型用于存储需要选择或注销的输入法。

**类型结构**

```cpp
typedef struct XImeSelect
{
    XImeU32 size, version;
    char    id[XIME_ID_BYTES];
} XImeSelect;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**id** &emsp;标识或曲线编号。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-6"></a>

### 4-9-6 XImeSession类型

该类型用于存储V1输入法会话。

**类型结构**

```cpp
typedef struct XImeSession
{
    XImeU32 size, version;
    XImeU64 session;
} XImeSession;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-7"></a>

### 4-9-7 XImeEvent类型

该类型用于存储V1输入法待处理事件。

**类型结构**

```cpp
typedef struct XImeEvent
{
    XImeU32 size, version;
    XImeU64 session, sequence, context;
    XImeU32 kind, modifiers, mode, reserved;
    XImeU64 message, value;
} XImeEvent;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**sequence** &emsp;事件或快照序列号，用于识别更新。

&emsp;**context** &emsp;输入上下文编号。

&emsp;**kind** &emsp;输入法事件类别。

&emsp;**modifiers** &emsp;修饰键状态位。

&emsp;**mode** &emsp;英文或中文输入模式。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**message** &emsp;原始窗口消息类型。

&emsp;**value** &emsp;原始按键值或该类事件的数据。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-8"></a>

### 4-9-8 XImeReply类型

该类型用于存储V1输入法事件回复。

**类型结构**

```cpp
typedef struct XImeReply
{
    XImeU32 size, version;
    XImeU64 session, sequence, context;
    XImeU32 action, reserved;
    char    text[XIME_TEXT_BYTES];
} XImeReply;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**sequence** &emsp;事件或快照序列号，用于识别更新。

&emsp;**context** &emsp;输入上下文编号。

&emsp;**action** &emsp;事件回复动作。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**text** &emsp;UTF-8文本。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-9"></a>

### 4-9-9 XImeUi类型

该类型用于存储V1候选窗口内容。

**类型结构**

```cpp
typedef struct XImeUi
{
    XImeU32 size, version;
    XImeU64 session, context, sequence;
    XImeU32 visible, selected, count, page;
    char    preedit[XIME_TEXT_BYTES];
    char    candidates[XIME_MAX_CANDIDATES][XIME_CANDIDATE_BYTES];
} XImeUi;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**context** &emsp;输入上下文编号。

&emsp;**sequence** &emsp;事件或快照序列号，用于识别更新。

&emsp;**visible** &emsp;候选窗口是否可见。

&emsp;**selected** &emsp;选中的候选项。

&emsp;**count** &emsp;有效条目数量。

&emsp;**page** &emsp;候选页编号。

&emsp;**preedit** &emsp;尚未提交的预编辑文本。

&emsp;**candidates** &emsp;候选文本数组。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-10"></a>

### 4-9-10 XImeMode类型

该类型用于存储输入法会话的语言模式。

**类型结构**

```cpp
typedef struct XImeMode
{
    XImeU32 size, version;
    XImeU64 session;
    XImeU32 mode, reserved;
} XImeMode;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**mode** &emsp;英文或中文输入模式。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-11"></a>

### 4-9-11 XImeContext类型

该类型用于存储应用窗口的输入上下文。

**类型结构**

```cpp
typedef struct XImeContext
{
    XImeU32 size, version;
    XImeU64 window, control;
    XImeU32 flags, reserved;
    XImeI32 caret_x, caret_y;
} XImeContext;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**window** &emsp;所属窗口或控件编号。

&emsp;**control** &emsp;所属窗口或控件编号。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**caret\_x** &emsp;光标在客户区内的位置。

&emsp;**caret\_y** &emsp;光标在客户区内的位置。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-12"></a>

### 4-9-12 XImeSessionV2类型

该类型用于存储V2输入法会话及协商能力。

**类型结构**

```cpp
typedef struct XImeSessionV2
{
    XImeU32 size, version;
    XImeU64 session;
    XImeU32 capabilities, page_size;
} XImeSessionV2;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**capabilities** &emsp;协商的输入法能力位。

&emsp;**page\_size** &emsp;每页候选数量。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-13"></a>

### 4-9-13 XImeEventV2类型

该类型用于存储包含候选版本的V2事件。

**类型结构**

```cpp
typedef struct XImeEventV2
{
    XImeU32 size, version;
    XImeU64 session, sequence, context;
    XImeU32 kind, modifiers, mode, reserved;
    XImeU64 message, value;
    XImeU64 revision;
} XImeEventV2;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**sequence** &emsp;事件或快照序列号，用于识别更新。

&emsp;**context** &emsp;输入上下文编号。

&emsp;**kind** &emsp;输入法事件类别。

&emsp;**modifiers** &emsp;修饰键状态位。

&emsp;**mode** &emsp;英文或中文输入模式。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**message** &emsp;原始窗口消息类型。

&emsp;**value** &emsp;原始按键值或该类事件的数据。

&emsp;**revision** &emsp;快照或候选内容的修订编号。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-14"></a>

### 4-9-14 XImeReplyV2类型

该类型用于存储支持长文本的V2事件回复。

**类型结构**

```cpp
typedef struct XImeReplyV2
{
    XImeU32 size, version;
    XImeU64 session, sequence, context;
    XImeU32 action, reserved;
    char text[XIME_COMMIT_BYTES];
} XImeReplyV2;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**sequence** &emsp;事件或快照序列号，用于识别更新。

&emsp;**context** &emsp;输入上下文编号。

&emsp;**action** &emsp;事件回复动作。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**text** &emsp;UTF-8文本。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-15"></a>

### 4-9-15 XImeUiV2类型

该类型用于存储支持分页和预览的V2候选窗口。

**类型结构**

```cpp
typedef struct XImeUiV2
{
    XImeU32 size, version;
    XImeU64 session, context, sequence;
    XImeU32 visible, selected, count, page;
    XImeU64 revision;
    XImeU32 flags, page_size;
    char preedit[XIME_COMMIT_BYTES];
    char candidates[XIME_MAX_CANDIDATES][XIME_LABEL_BYTES];
    char preview[XIME_COMMIT_BYTES];
} XImeUiV2;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**context** &emsp;输入上下文编号。

&emsp;**sequence** &emsp;事件或快照序列号，用于识别更新。

&emsp;**visible** &emsp;候选窗口是否可见。

&emsp;**selected** &emsp;选中的候选项。

&emsp;**count** &emsp;有效条目数量。

&emsp;**page** &emsp;候选页编号。

&emsp;**revision** &emsp;快照或候选内容的修订编号。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**page\_size** &emsp;每页候选数量。

&emsp;**preedit** &emsp;尚未提交的预编辑文本。

&emsp;**candidates** &emsp;候选文本数组。

&emsp;**preview** &emsp;V2候选预览文本。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-16"></a>

### 4-9-16 XImeUserData类型

该类型用于存储输入法用户数据读写和选项请求。

**类型结构**

```cpp
typedef struct XImeUserData
{
    XImeU32 size, version, operation, flags;
    XImeU64 session, generation, buffer;
    XImeU32 capacity, length;
    char id[XIME_ID_BYTES];
} XImeUserData;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**operation** &emsp;文件或用户数据操作编号。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**session** &emsp;输入法会话编号。

&emsp;**generation** &emsp;数据或接口状态的代际编号。

&emsp;**buffer** &emsp;数据缓冲区或用户虚拟地址，详见字段类型。

&emsp;**capacity** &emsp;缓冲区容量。

&emsp;**length** &emsp;数据长度。

&emsp;**id** &emsp;标识或曲线编号。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-4-9-17"></a>

### 4-9-17 xapi\_ImeRegister();

该函数将会注册一个输入法的标识和显示名称。系统自行确定注册程序的可执行文件路径。

**函数参数**

```cpp
XImeResult xapi_ImeRegister(const XImeRegistration *request);
```

&emsp;**request** &emsp;本次操作的请求结构体；HTTP操作中也可能为请求句柄，详见声明。 结构见4-9-1。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XIME\_ID\_BYTES | 48U | 标识数组字节数。 |
| XIME\_NAME\_BYTES | 64U | 名称数组字节数。 |
| XIME\_PATH\_BYTES | 256U | 路径数组字节数。 |
| XIME\_TEXT\_BYTES | 256U | 文本数组字节数。 |
| XIME\_MAX\_INSTALLED | 16U | 可安装输入法数量上限。 |
| XIME\_MAX\_CANDIDATES | 9U | 候选数量上限。 |
| XIME\_CANDIDATE\_BYTES | 64U | 单个候选数组字节数。 |

<a id="table-4-9-17-1"></a>

**表格4-9-17-1 输入法V1版本和文本容量**

<a id="xapi-4-9-18"></a>

### 4-9-18 xapi\_ImeEnum();

该函数将会列出当前已安装的输入法。

**函数参数**

```cpp
XImeResult xapi_ImeEnum(XImeList *list);
```

&emsp;**list** &emsp;用于接收输入法列表的结构体。 结构见4-9-3。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-19"></a>

### 4-9-19 xapi\_ImeGetState();

该函数将会获取当前输入法、语言模式和会话连接状态。

**函数参数**

```cpp
XImeResult xapi_ImeGetState(XImeState *state);
```

&emsp;**state** &emsp;用于接收输入法状态的结构体。 结构见4-9-4。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_MODE\_ENGLISH | 0U | 英文输入模式。 |
| XIME\_MODE\_CHINESE | 1U | 中文输入模式。 |

<a id="table-4-9-19-1"></a>

**表格4-9-19-1 输入法模式**

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-20"></a>

### 4-9-20 xapi\_ImeSetActive();

该函数将会选择当前使用的输入法。

**函数参数**

```cpp
XImeResult xapi_ImeSetActive(const XImeSelect *request);
```

&emsp;**request** &emsp;本次操作的请求结构体；HTTP操作中也可能为请求句柄，详见声明。 结构见4-9-5。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-21"></a>

### 4-9-21 xapi\_ImeUnregister();

该函数将会注销指定输入法。

**函数参数**

```cpp
XImeResult xapi_ImeUnregister(const XImeSelect *request);
```

&emsp;**request** &emsp;本次操作的请求结构体；HTTP操作中也可能为请求句柄，详见声明。 结构见4-9-5。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-22"></a>

### 4-9-22 xapi\_ImeAttach();

该函数将会建立V1输入法引擎会话。

**函数参数**

```cpp
XImeResult xapi_ImeAttach(XImeSession *session);
```

&emsp;**session** &emsp;输入法会话结构体。 结构见4-9-6。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-23"></a>

### 4-9-23 xapi\_ImeGetEvent();

该函数将会尝试取得一个输入法事件。没有事件时立即返回，不会一直等待。

**函数参数**

```cpp
XImeResult xapi_ImeGetEvent(XImeEvent *event);
```

&emsp;**event** &emsp;用于接收输入法事件的结构体。 结构见4-9-7。

返回值 &emsp;成功返回0，失败返回负errno。

队列为空返回-EAGAIN。应用应等待或休眠后重试，不应持续忙轮询。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_MOD\_SHIFT | 1U | 对应Shift、Ctrl、Alt、Win或Caps状态位。 |
| XIME\_MOD\_CTRL | 2U | 对应Shift、Ctrl、Alt、Win或Caps状态位。 |
| XIME\_MOD\_ALT | 4U | 对应Shift、Ctrl、Alt、Win或Caps状态位。 |
| XIME\_MOD\_WIN | 8U | 对应Shift、Ctrl、Alt、Win或Caps状态位。 |
| XIME\_MOD\_CAPS | 16U | 对应Shift、Ctrl、Alt、Win或Caps状态位。 |
| XIME\_MOD\_SHIFT\_TAP | 32U | 单独按下并松开Shift，非组合键。 |
| XIME\_KEY\_SHIFT | 133U | Shift键编号。 |
| XIME\_EVENT\_KEY | 1U | 键盘输入事件。 |
| XIME\_EVENT\_RESET | 2U | 重置输入状态事件。 |
| XIME\_EVENT\_CANDIDATE | 3U | 候选选择事件。 |

<a id="table-4-9-23-1"></a>

**表格4-9-23-1 输入法V1事件和修饰键**

本接口所用常量及相关状态说明请参见表格4-9-17-1、表格4-9-19-1。

<a id="xapi-4-9-24"></a>

### 4-9-24 xapi\_ImeReplyEvent();

该函数将会回复输入法事件，决定放行、消费按键或提交UTF-8文本。

**函数参数**

```cpp
XImeResult xapi_ImeReplyEvent(const XImeReply *reply);
```

&emsp;**reply** &emsp;提交给输入法管理器的事件回复。 结构见4-9-8。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_REPLY\_PASS | 0U | 放行原始输入。 |
| XIME\_REPLY\_CONSUMED | 1U | 消费输入，不再传给应用。 |
| XIME\_REPLY\_COMMIT\_UTF8 | 2U | 提交UTF-8文本。 |

<a id="table-4-9-24-1"></a>

**表格4-9-24-1 输入法回复动作**

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-25"></a>

### 4-9-25 xapi\_ImeUpdateUi();

该函数将会更新预编辑文本、候选词、选中项及候选页。

**函数参数**

```cpp
XImeResult xapi_ImeUpdateUi(const XImeUi *ui);
```

&emsp;**ui** &emsp;预编辑文本和候选窗口信息。 结构见4-9-9。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-26"></a>

### 4-9-26 xapi\_ImeSetMode();

该函数将会设置输入法会话的英文或中文模式。

**函数参数**

```cpp
XImeResult xapi_ImeSetMode(const XImeMode *mode);
```

&emsp;**mode** &emsp;输入法语言模式结构体。 结构见4-9-10。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-9-17-1、表格4-9-19-1。

<a id="xapi-4-9-27"></a>

### 4-9-27 xapi\_ImeSetContext();

该函数将会设置窗口输入上下文，包括控件编号、密码标志和光标位置。

**函数参数**

```cpp
XImeResult xapi_ImeSetContext(const XImeContext *context);
```

&emsp;**context** &emsp;窗口输入上下文结构体。 结构见4-9-11。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_CONTEXT\_ENABLED | 1U | 启用此输入上下文。 |
| XIME\_CONTEXT\_PASSWORD | 2U | 密码输入上下文。 |

<a id="table-4-9-27-1"></a>

**表格4-9-27-1 输入上下文标志**

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-28"></a>

### 4-9-28 xapi\_ImeAttachV2();

该函数将会建立V2输入法会话，并协商分页、长文本等能力。

**函数参数**

```cpp
XImeResult xapi_ImeAttachV2(XImeSessionV2 *session);
```

&emsp;**session** &emsp;输入法会话结构体。 结构见4-9-12。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_ABI\_V2 | 2U | 输入法V2版本号。 |
| XIME\_CAP\_PAGING | 1U | 支持候选分页。 |
| XIME\_CAP\_LONG\_TEXT | 2U | 支持长文本提交及显示。 |
| XIME\_COMMIT\_BYTES | 1024U | V2提交文本数组字节数。 |
| XIME\_LABEL\_BYTES | 256U | V2候选标签数组字节数。 |

<a id="table-4-9-28-1"></a>

**表格4-9-28-1 输入法V2能力和容量**

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-9-29"></a>

### 4-9-29 xapi\_ImeGetEventV2();

该函数将会取得一个V2输入法事件，额外提供候选内容的修订编号。

**函数参数**

```cpp
XImeResult xapi_ImeGetEventV2(XImeEventV2 *event);
```

&emsp;**event** &emsp;用于接收输入法事件的结构体。 结构见4-9-13。

返回值 &emsp;成功返回0，失败返回负errno。

队列为空返回-EAGAIN。revision表示用户按下候选时显示的候选版本。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_EVENT\_PAGE | 4U | 候选翻页事件。 |
| XIME\_EVENT\_LAYOUT | 5U | 候选布局变化事件。 |

<a id="table-4-9-29-1"></a>

**表格4-9-29-1 输入法V2扩展事件**

本接口所用常量及相关状态说明请参见表格4-9-17-1、表格4-9-19-1、表格4-9-23-1、表格4-9-28-1。

<a id="xapi-4-9-30"></a>

### 4-9-30 xapi\_ImeReplyEventV2();

该函数将会回复V2输入法事件，支持提交更长的UTF-8文本。

**函数参数**

```cpp
XImeResult xapi_ImeReplyEventV2(const XImeReplyV2 *reply);
```

&emsp;**reply** &emsp;提交给输入法管理器的事件回复。 结构见4-9-14。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格4-9-17-1、表格4-9-24-1、表格4-9-28-1。

<a id="xapi-4-9-31"></a>

### 4-9-31 xapi\_ImeUpdateUiV2();

该函数将会更新V2候选窗口，包括分页标志、候选版本和预览文本。

**函数参数**

```cpp
XImeResult xapi_ImeUpdateUiV2(const XImeUiV2 *ui);
```

&emsp;**ui** &emsp;预编辑文本和候选窗口信息。 结构见4-9-15。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_UI\_PREVIOUS | 1U | 还有上一页候选。 |
| XIME\_UI\_NEXT | 2U | 还有下一页候选。 |
| XIME\_UI\_PREDICTION | 4U | 显示预测候选。 |

<a id="table-4-9-31-1"></a>

**表格4-9-31-1 输入法V2界面标志**

本接口所用常量及相关状态说明请参见表格4-9-17-1、表格4-9-28-1。

<a id="xapi-4-9-32"></a>

### 4-9-32 xapi\_ImeUserData();

该函数将会读取或保存输入法的用户数据，并管理启用状态和预测、标点等选项。

**函数参数**

```cpp
XImeResult xapi_ImeUserData(XImeUserData *request);
```

&emsp;**request** &emsp;本次操作的请求结构体；HTTP操作中也可能为请求句柄，详见声明。 结构见4-9-16。

返回值 &emsp;成功返回0，失败返回负errno。

系统推导账号和存储路径。SAVE使用LOAD或INFO取得的generation；清除或切换启用状态会使旧的缓冲写入失效。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XIME\_USER\_DATA\_LIMIT | 1048576U | 输入法用户数据字节数上限。 |
| XIME\_DATA\_INFO | 0U | 查询用户数据元信息。 |
| XIME\_DATA\_LOAD | 1U | 读取用户数据。 |
| XIME\_DATA\_SAVE | 2U | 保存用户数据。 |
| XIME\_DATA\_CLEAR | 3U | 清除用户数据。 |
| XIME\_DATA\_SET\_ENABLED | 4U | 修改用户数据启用状态。 |
| XIME\_DATA\_ENABLED | 1U | 用户数据已启用。 |
| XIME\_DATA\_ASYNC | 2U | 异步用户数据操作标志。 |
| XIME\_DATA\_PENDING | 4U | 用户数据操作尚未完成。 |
| XIME\_DATA\_STATUS | 5U | 查询用户数据操作状态。 |
| XIME\_DATA\_SET\_OPTIONS | 6U | 设置输入法选项。 |
| XIME\_DATA\_PREDICTION | 8U | 启用预测选项。 |
| XIME\_DATA\_PUNCTUATION | 16U | 启用标点选项。 |
| XIME\_DATA\_OPTIONS | (XIME\_DATA\_ENABLED \| XIME\_DATA\_PREDICTION \| XIME\_DATA\_PUNCTUATION) | 全部可设置的输入法选项位。 |

<a id="table-4-9-32-1"></a>

**表格4-9-32-1 输入法用户数据**

本接口所用常量及相关状态说明请参见表格4-9-17-1。

<a id="xapi-4-10"></a>

## 4-10 截屏

<a id="xapi-4-10-1"></a>

### 4-10-1 xapi\_CaptureScreen();

该函数将会获取屏幕尺寸或读取当前屏幕像素。像素缓冲区采用逐行紧密排列的RGBA格式。

**函数参数**

```cpp
UINT64 xapi_CaptureScreen(
    XCOLORA *buffer,
    UINT64 pixel_capacity,
    UINT32 *width,
    UINT32 *height
);
```

&emsp;**buffer** &emsp;用于接收输出数据的可写缓冲区。 结构见4-3-1。

&emsp;**pixel\_capacity** &emsp;像素缓冲区的容量，以RGBA像素数计，不是字节数。

&emsp;**width** &emsp;宽度或高度，单位像素。

&emsp;**height** &emsp;宽度或高度，单位像素。

返回值 &emsp;成功返回0，失败返回负errno。 返回类型为UINT64时，负错误以该无符号类型编码。

buffer为NULL时只查询尺寸；pixel\_capacity以像素计。实际捕获会产生系统提示。存在受保护进程时返回-EACCES；合成器繁忙返回-EAGAIN，空间不足返回-ENOSPC。

<a id="xapi-4-10-2"></a>

### 4-10-2 xapi\_SetSecret();

该函数将会为当前进程启用屏幕捕获保护。保护持续到该进程及被标记的fork子进程退出。

**函数参数**

```cpp
INT64 xapi_SetSecret(void);
```

返回值 &emsp;成功返回0，失败返回负errno。

有尚存的原始framebuffer映射、无法安全建立保护时返回-EBUSY。

<a id="xapi-4-11"></a>

## 4-11 通知和重点

<a id="xapi-4-11-1"></a>

### 4-11-1 XApiNotificationRequest类型

该类型用于存储一条带操作按钮的系统通知。

**类型结构**

```cpp
typedef struct {
    UINT64 key;
    char  *title;
    char  *text;
    UINT64 builtin_icon;
    char  *icon_path;
    char  *action0_text;
    UINT64 action0_id;
    char  *action1_text;
    UINT64 action1_id;
} XApiNotificationRequest;
```

&emsp;**key** &emsp;对象成员键名，或控件在窗口内的稳定标识。

&emsp;**title** &emsp;标题字符串。

&emsp;**text** &emsp;UTF-8文本。

&emsp;**builtin\_icon** &emsp;内置通知图标编号。

&emsp;**icon\_path** &emsp;自定义图标路径。

&emsp;**action0\_text** &emsp;第一个或第二个操作按钮的文本。

&emsp;**action0\_id** &emsp;按钮对应的应用操作编号。

&emsp;**action1\_text** &emsp;第一个或第二个操作按钮的文本。

&emsp;**action1\_id** &emsp;按钮对应的应用操作编号。

<a id="xapi-4-11-2"></a>

### 4-11-2 xapi\_SendAppMessage();

该函数会发送一个消息通知。

**函数参数**

```cpp
void xapi_SendAppMessage(WSTR title, WSTR text);
```

&emsp;**title** &emsp;对话框或通知标题。

&emsp;**text** &emsp;UTF-8文本字符串。

返回值 &emsp;无。

<a id="xapi-4-11-3"></a>

### 4-11-3 xapi\_SetNotifyPrcor();

该函数将会登记通知操作的回调函数，用于接收用户选择的通知按钮。

**函数参数**

```cpp
UINT64 xapi_SetNotifyPrcor(XApiNotifyPrcor func);
```

&emsp;**func** &emsp;用户提供的回调函数。

返回值 &emsp;成功返回0，失败返回负errno。 返回类型为UINT64时，负错误以该无符号类型编码。

func为NULL时注销回调。

<a id="xapi-4-11-4"></a>

### 4-11-4 xapi\_SendNotification();

该函数将会发送带标题、正文、图标及最多两个操作按钮的通知。

**函数参数**

```cpp
UINT64 xapi_SendNotification(const XApiNotificationRequest *req);
```

&emsp;**req** &emsp;本次操作的请求结构体；HTTP操作中也可能为请求句柄，详见声明。 结构见4-11-1。

返回值 &emsp;成功返回通知ID；桌面尚未准备好时返回0，失败返回编码在UINT64中的负errno。

若包含操作按钮，请先登记通知回调。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNOTIFY\_ICON\_NONE | 0 | 不使用内置图标。 |
| XNOTIFY\_ICON\_INFO | 1 | 信息图标。 |
| XNOTIFY\_ICON\_SUCCESS | 2 | 成功图标。 |
| XNOTIFY\_ICON\_WARNING | 3 | 警告图标。 |
| XNOTIFY\_ICON\_ERROR | 4 | 错误图标。 |
| XNOTIFY\_ICON\_APP | 5 | 应用图标。 |

<a id="table-4-11-4-1"></a>

**表格4-11-4-1 XNotifyBuiltinIcon**

<a id="xapi-4-11-5"></a>

### 4-11-5 xapi\_HighlightNotice();

该函数将会向重点栏提交一条指定样式的提示，不要求调用程序已经创建窗口。

**函数参数**

```cpp
XHighlightResult xapi_HighlightNotice(
    XHighlightStyle style,
    const char *text
);
```

&emsp;**style** &emsp;重点提示样式。

&emsp;**text** &emsp;UTF-8文本字符串。

返回值 &emsp;成功返回0，失败返回负errno。

文本上限为1024个UTF-8字节，不含结尾空字符。Root/System可以使用所有样式，其他用户可使用IMPORTANT、REMINDER、SUCCESS。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XHIGHLIGHT\_IMPORTANT | 1U | 重要提示样式。 |
| XHIGHLIGHT\_REMINDER | 2U | 提醒样式。 |
| XHIGHLIGHT\_ALERT | 3U | 警示样式。 |
| XHIGHLIGHT\_WARNING | 4U | 警告样式，可打断较低优先级提示。 |
| XHIGHLIGHT\_SUCCESS | 5U | 成功样式。 |
| XHIGHLIGHT\_TEXT\_MAX | 1024U | 提示文本最大UTF-8字节数，不含结尾空字符。 |

<a id="table-4-11-5-1"></a>

**表格4-11-5-1 重点提示样式**

<a id="xapi-5"></a>

# CHAPTER 5 – XJ380 API (XAPI网络版)

**XJ380 API** **(XAPI** **XNet** **Edition)**

本章节将会介绍XAPI的原生网络API相关部分。

<a id="xapi-5-1"></a>

## 5-1 XNet原生网络

<a id="xapi-5-1-1"></a>

### 5-1-1 XNetCapabilities类型

该类型用于存储原生网络能力和资源上限。

**类型结构**

```cpp
typedef struct XNetCapabilities
{
    uint32_t size, version, backend_present, max_objects;
    uint64_t features;
    uint32_t max_wait_items, max_transfer_bytes, max_dns_results, interface_count;
    uint64_t reserved[2];
} XNetCapabilities;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**backend\_present** &emsp;网络后端是否存在。

&emsp;**max\_objects** &emsp;原生网络对象数量上限。

&emsp;**features** &emsp;网络能力位集合。

&emsp;**max\_wait\_items** &emsp;单次等待条数、传输字节数及DNS结果条数上限。

&emsp;**max\_transfer\_bytes** &emsp;单次等待条数、传输字节数及DNS结果条数上限。

&emsp;**max\_dns\_results** &emsp;单次等待条数、传输字节数及DNS结果条数上限。

&emsp;**interface\_count** &emsp;网络接口数量。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-2"></a>

### 5-1-2 XNetAddress类型

该类型用于存储IPv4或IPv6地址。

**类型结构**

```cpp
typedef struct XNetAddress
{
    uint32_t family, scope_id;
    uint8_t  bytes[16];
} XNetAddress;
```

&emsp;**family** &emsp;地址族。

&emsp;**scope\_id** &emsp;IPv6作用域编号；IPv4时填写0。

&emsp;**bytes** &emsp;地址字节。IPv4使用前4字节，按网络字节序存放；IPv6使用16字节。

<a id="xapi-5-1-3"></a>

### 5-1-3 XNetOpenDesc类型

该类型用于存储创建原生socket时的配置。

**类型结构**

```cpp
typedef struct XNetOpenDesc
{
    uint32_t        size, version, family, transport;
    XNetInterfaceId interface_id;
    uint32_t        flags;
    uint64_t        reserved[2];
} XNetOpenDesc;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**family** &emsp;地址族。

&emsp;**transport** &emsp;TCP或UDP传输类型。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**flags** &emsp;保留标志，当前填写0。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-4"></a>

### 5-1-4 XNetEndpoint类型

该类型用于存储一个IP地址和端口。

**类型结构**

```cpp
typedef struct XNetEndpoint
{
    XNetAddress address;
    uint16_t    port, reserved16;
    uint32_t    reserved32;
} XNetEndpoint;
```

&emsp;**address** &emsp;IP地址。

&emsp;**port** &emsp;主机字节序的端口号。

&emsp;**reserved16** &emsp;保留字段，输入时置零。

&emsp;**reserved32** &emsp;保留字段，输入时置零。

<a id="xapi-5-1-5"></a>

### 5-1-5 XNetIoOptions类型

该类型用于存储网络操作的超时和取消选项。

**类型结构**

```cpp
typedef struct XNetIoOptions
{
    uint32_t   size, version;
    int32_t    timeout_ms;
    uint32_t   reserved;
    XNetHandle cancel;
} XNetIoOptions;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**timeout\_ms** &emsp;超时毫秒数；0立即返回，-1无限等待。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**cancel** &emsp;关联的原生网络取消对象句柄。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-6"></a>

### 5-1-6 XNetDatagramInfo类型

该类型用于存储收到的UDP数据报信息。

**类型结构**

```cpp
typedef struct XNetDatagramInfo
{
    uint32_t     size, version, interface_id, flags;
    uint64_t     original_bytes;
    XNetEndpoint source;
} XNetDatagramInfo;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**original\_bytes** &emsp;收到的数据报原始字节数。

&emsp;**source** &emsp;数据报发送端地址。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-7"></a>

### 5-1-7 XNetSocketInfo类型

该类型用于存储socket当前状态和端点信息。

**类型结构**

```cpp
typedef struct XNetSocketInfo
{
    uint32_t     size, version, state, events;
    uint32_t     family, transport, interface_id, shutdown;
    int64_t      connection_result;
    XNetEndpoint local, peer;
    uint64_t     reserved[2];
} XNetSocketInfo;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**state** &emsp;对象当前状态，使用对应接口的状态常量。

&emsp;**events** &emsp;当前事件位。

&emsp;**family** &emsp;地址族。

&emsp;**transport** &emsp;TCP或UDP传输类型。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**shutdown** &emsp;已经关闭的收发方向位。

&emsp;**connection\_result** &emsp;连接操作结果，负值表示错误。

&emsp;**local** &emsp;本地或对端地址和端口。

&emsp;**peer** &emsp;本地或对端地址和端口。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-8"></a>

### 5-1-8 XNetTcpOptions类型

该类型用于存储TCP延迟发送及保活设置。

**类型结构**

```cpp
typedef struct XNetTcpOptions
{
    uint32_t size, version, no_delay, keepalive;
    uint32_t keep_idle_ms, keep_interval_ms, keep_count, reserved;
} XNetTcpOptions;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**no\_delay** &emsp;是否关闭TCP延迟发送。

&emsp;**keepalive** &emsp;是否启用TCP保活。

&emsp;**keep\_idle\_ms** &emsp;保活开始前空闲时间、探测间隔及探测次数。

&emsp;**keep\_interval\_ms** &emsp;保活开始前空闲时间、探测间隔及探测次数。

&emsp;**keep\_count** &emsp;保活开始前空闲时间、探测间隔及探测次数。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-9"></a>

### 5-1-9 XNetUdpOptions类型

该类型用于存储UDP广播设置。

**类型结构**

```cpp
typedef struct XNetUdpOptions
{
    uint32_t size, version, broadcast, reserved;
} XNetUdpOptions;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**broadcast** &emsp;是否允许UDP广播。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-10"></a>

### 5-1-10 XNetWaitItem类型

该类型用于存储一个需要等待的网络对象。

**类型结构**

```cpp
typedef struct XNetWaitItem
{
    uint32_t   size, version;
    XNetHandle object;
    uint32_t   events, ready;
    uint64_t   tag;
} XNetWaitItem;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**object** &emsp;等待的原生网络对象句柄。

&emsp;**events** &emsp;当前事件位。

&emsp;**ready** &emsp;实际就绪的事件位。

&emsp;**tag** &emsp;由程序提供并原样返回的标记值。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-1-11"></a>

### 5-1-11 xapi\_NetGetCapabilities();

该函数将会查询网络后端是否存在、支持的能力和对象数量等上限。

**函数参数**

```cpp
XNetResult xapi_NetGetCapabilities(XNetCapabilities *caps);
```

&emsp;**caps** &emsp;用于接收网络能力的结构体。 结构见5-1-1。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XNET\_CAP\_IPV4 | 1ULL | 支持IPV4能力。 |
| XNET\_CAP\_IPV6 | 2ULL | 支持IPV6能力。 |
| XNET\_CAP\_TCP | 4ULL | 支持TCP能力。 |
| XNET\_CAP\_UDP | 8ULL | 支持UDP能力。 |
| XNET\_CAP\_DNS | 16ULL | 支持DNS能力。 |
| XNET\_CAP\_TCP\_NODELAY | 32ULL | 支持TCP NODELAY能力。 |
| XNET\_CAP\_TCP\_KEEPALIVE | 64ULL | 支持TCP KEEPALIVE能力。 |
| XNET\_CAP\_UDP\_BROADCAST | 128ULL | 支持UDP BROADCAST能力。 |
| XNET\_CAP\_RUNTIME\_CONFIG | 256ULL | 支持RUNTIME CONFIG能力。 |
| XNET\_CAP\_SAVED\_CONFIG | 512ULL | 支持SAVED CONFIG能力。 |
| XNET\_MAX\_WAIT\_ITEMS | 64U | 单次等待对象数量上限。 |
| XNET\_MAX\_HOST\_BYTES | 254U | 主机名缓冲区字节数上限。 |
| XNET\_MAX\_TRANSFER\_BYTES | 65536U | 单次网络传输字节数上限。 |
| XNET\_MAX\_OBJECTS | 256U | 原生网络对象数量上限。 |
| XNET\_MAX\_INTERFACE\_ADDRESSES | 8U | 接口地址数量上限。 |

<a id="table-5-1-11-1"></a>

**表格5-1-11-1 网络版本、能力和资源上限**

<a id="xapi-5-1-12"></a>

### 5-1-12 xapi\_NetParseAddress();

该函数将会把IP地址文本转换为原生网络地址结构。

**函数参数**

```cpp
XNetResult xapi_NetParseAddress(
    const char *text,
    XNetAddress *address
);
```

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**address** &emsp;IP地址结构体。 结构见5-1-2。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_IPV4 | 1U | IPv4或IPv6地址族。 |
| XNET\_IPV6 | 2U | IPv4或IPv6地址族。 |

<a id="table-5-1-12-1"></a>

**表格5-1-12-1 网络地址族**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-13"></a>

### 5-1-13 xapi\_NetFormatAddress();

该函数将会把原生网络地址结构转换为可读的IP地址文本。

**函数参数**

```cpp
XNetResult xapi_NetFormatAddress(
    const XNetAddress *address,
    char *text,
    uint32_t capacity
);
```

&emsp;**address** &emsp;IP地址结构体。 结构见5-1-2。

&emsp;**text** &emsp;UTF-8文本字符串。

&emsp;**capacity** &emsp;输出缓冲区容量，单位字节。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-1-12-1。

<a id="xapi-5-1-14"></a>

### 5-1-14 xapi\_NetOpen();

该函数将会按指定地址族和传输协议创建网络socket。

**函数参数**

```cpp
XNetResult xapi_NetOpen(
    const XNetOpenDesc *desc,
    XNetHandle *socket
);
```

&emsp;**desc** &emsp;描述本次操作的输入结构体指针。 结构见5-1-3。

&emsp;**socket** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

所有描述符与输出结构均应设置size/version，保留字段置零。原生网络句柄属于当前进程和执行映像，不是文件描述符；fork不继承，exec和退出会撤销。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_TCP | 1U | TCP流或UDP数据报传输协议。 |
| XNET\_UDP | 2U | TCP流或UDP数据报传输协议。 |
| XNET\_INVALID\_HANDLE | 0ULL | 无效的原生网络句柄。 |

<a id="table-5-1-14-1"></a>

**表格5-1-14-1 网络传输类型和句柄**

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-1-12-1。

<a id="xapi-5-1-15"></a>

### 5-1-15 xapi\_NetBind();

该函数将会把socket绑定到指定本地地址和端口。

**函数参数**

```cpp
XNetResult xapi_NetBind(
    XNetHandle socket,
    const XNetEndpoint *local
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**local** &emsp;本地地址和端口。 结构见5-1-4。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-16"></a>

### 5-1-16 xapi\_NetListen();

该函数将会把TCP socket设置为监听状态，等待客户端连接。

**函数参数**

```cpp
XNetResult xapi_NetListen(XNetHandle socket, uint32_t backlog);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**backlog** &emsp;等待接受的连接队列长度。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-17"></a>

### 5-1-17 xapi\_NetAccept();

该函数将会接受一个待处理的TCP连接，返回新socket及对端地址。

**函数参数**

```cpp
XNetResult xapi_NetAccept(
    XNetHandle socket,
    XNetHandle *accepted,
    XNetEndpoint *peer,
    const XNetIoOptions *io
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**accepted** &emsp;用于接收新连接句柄的指针。

&emsp;**peer** &emsp;对端地址和端口，Accept中用于接收结果。 结构见5-1-4。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-18"></a>

### 5-1-18 xapi\_NetConnect();

该函数将会连接指定对端。立即模式可以启动异步连接，随后通过等待和查询获取结果。

**函数参数**

```cpp
XNetResult xapi_NetConnect(
    XNetHandle socket,
    const XNetEndpoint *peer,
    const XNetIoOptions *io
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**peer** &emsp;对端地址和端口，Accept中用于接收结果。 结构见5-1-4。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回0，失败返回负errno。

io为NULL或timeout\_ms为0时立即操作，连接尚未完成返回-EINPROGRESS。timeout\_ms为-1时无限等待，正值为本次操作的总毫秒上限。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-19"></a>

### 5-1-19 xapi\_NetSend();

该函数将会通过已连接socket发送数据。TCP允许只发送一部分数据。

**函数参数**

```cpp
XNetResult xapi_NetSend(
    XNetHandle socket,
    const void *data,
    uint64_t bytes,
    const XNetIoOptions *io
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**data** &emsp;待发送的只读数据缓冲区。

&emsp;**bytes** &emsp;数据长度，单位字节。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回传输字节数，失败返回负errno；读取结束的含义见正文说明。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-20"></a>

### 5-1-20 xapi\_NetReceive();

该函数将会从已连接socket接收数据。TCP返回0表示对端已结束发送。

**函数参数**

```cpp
XNetResult xapi_NetReceive(
    XNetHandle socket,
    void *buffer,
    uint64_t capacity,
    const XNetIoOptions *io
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**buffer** &emsp;用于接收输出数据的可写缓冲区。

&emsp;**capacity** &emsp;输出缓冲区容量，单位字节。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回传输字节数，失败返回负errno；读取结束的含义见正文说明。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-21"></a>

### 5-1-21 xapi\_NetSendTo();

该函数将会向指定地址发送一个UDP数据报。数据报发送保持完整，不做部分发送。

**函数参数**

```cpp
XNetResult xapi_NetSendTo(
    XNetHandle socket,
    const XNetEndpoint *peer,
    const void *data,
    uint64_t bytes,
    const XNetIoOptions *io
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**peer** &emsp;对端地址和端口，Accept中用于接收结果。 结构见5-1-4。

&emsp;**data** &emsp;待发送的只读数据缓冲区。

&emsp;**bytes** &emsp;数据长度，单位字节。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回传输字节数，失败返回负errno；读取结束的含义见正文说明。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-22"></a>

### 5-1-22 xapi\_NetReceiveFrom();

该函数将会接收一个UDP数据报，并返回发送端和数据报原始长度。

**函数参数**

```cpp
XNetResult xapi_NetReceiveFrom(
    XNetHandle socket,
    void *buffer,
    uint64_t capacity,
    XNetDatagramInfo *info,
    const XNetIoOptions *io
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**buffer** &emsp;用于接收输出数据的可写缓冲区。

&emsp;**capacity** &emsp;输出缓冲区容量，单位字节。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见5-1-6。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回传输字节数，失败返回负errno；读取结束的含义见正文说明。

即使返回0也可能是合法的空UDP数据报。缓冲区不足时通过info报告截断及original\_bytes。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_DATAGRAM\_TRUNCATED | 1U | 数据报超过缓冲区容量而被截断。 |

<a id="table-5-1-22-1"></a>

**表格5-1-22-1 UDP数据报标志**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-23"></a>

### 5-1-23 xapi\_NetSendAll();

该函数将会尝试发送全部数据，并通过sent返回已经发送的字节数。发生错误时也应检查sent。

**函数参数**

```cpp
XNetResult xapi_NetSendAll(
    XNetHandle socket,
    const void *data,
    uint64_t bytes,
    const XNetIoOptions *io,
    uint64_t *sent
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**data** &emsp;待发送的只读数据缓冲区。

&emsp;**bytes** &emsp;数据长度，单位字节。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

&emsp;**sent** &emsp;用于接收已经发送字节数的指针，包括发生错误前的部分。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-24"></a>

### 5-1-24 xapi\_NetShutdown();

该函数将会关闭socket的接收方向、发送方向或两个方向，保留句柄供查询和关闭。

**函数参数**

```cpp
XNetResult xapi_NetShutdown(
    XNetHandle socket,
    uint32_t direction
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**direction** &emsp;要关闭的接收、发送或两个方向。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_SHUT\_RECEIVE | 1U | 关闭接收方向。 |
| XNET\_SHUT\_SEND | 2U | 关闭发送方向。 |
| XNET\_SHUT\_BOTH | 3U | 关闭发送和接收方向。 |
| XNET\_READ\_CLOSED | 1U | 接收方向已关闭。 |
| XNET\_WRITE\_CLOSED | 2U | 发送方向已关闭。 |

<a id="table-5-1-24-1"></a>

**表格5-1-24-1 网络收发方向**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-25"></a>

### 5-1-25 xapi\_NetQuery();

该函数将会读取socket状态、本地与对端地址以及连接结果。

**函数参数**

```cpp
XNetResult xapi_NetQuery(
    XNetHandle socket,
    XNetSocketInfo *info
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见5-1-7。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_CREATED | 1U | socket已创建。 |
| XNET\_BOUND | 2U | socket已绑定本地端点。 |
| XNET\_LISTENING | 3U | socket正在监听。 |
| XNET\_CONNECTING | 4U | 正在建立连接。 |
| XNET\_CONNECTED | 5U | 连接已经建立。 |
| XNET\_FAILED | 6U | 发生错误。 |

<a id="table-5-1-25-1"></a>

**表格5-1-25-1 网络连接状态**

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_READABLE | 1U | 可以读取数据。 |
| XNET\_WRITABLE | 2U | 可以写入数据。 |
| XNET\_ACCEPTABLE | 4U | 存在可接受的连接。 |
| XNET\_CONNECTION\_READY | 8U | 连接操作已有结果。 |
| XNET\_DONE | 16U | 操作已经完成。 |
| XNET\_CHANGED | 32U | 被监听的状态发生变化。 |
| XNET\_ERROR | 64U | 发生错误。 |
| XNET\_CLOSED | 128U | 对象已关闭。 |
| XNET\_INVALID | 256U | 对象或句柄无效。 |
| XNET\_EVENTS\_ALL | 511U | 该接口所有已定义事件位。 |
| XNET\_CANCELLED | (-125LL) | 操作已经取消。 |

<a id="table-5-1-25-2"></a>

**表格5-1-25-2 网络事件**

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-1-14-1、表格5-1-24-1。

<a id="xapi-5-1-26"></a>

### 5-1-26 xapi\_NetSetTcpOptions();

该函数将会设置TCP延迟发送和保活选项。

**函数参数**

```cpp
XNetResult xapi_NetSetTcpOptions(
    XNetHandle socket,
    const XNetTcpOptions *options
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**options** &emsp;TCP或UDP选项结构体。 结构见5-1-8。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-27"></a>

### 5-1-27 xapi\_NetGetTcpOptions();

该函数将会读取TCP延迟发送和保活选项。

**函数参数**

```cpp
XNetResult xapi_NetGetTcpOptions(
    XNetHandle socket,
    XNetTcpOptions *options
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**options** &emsp;TCP或UDP选项结构体。 结构见5-1-8。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-28"></a>

### 5-1-28 xapi\_NetSetUdpOptions();

该函数将会设置UDP广播等选项。

**函数参数**

```cpp
XNetResult xapi_NetSetUdpOptions(
    XNetHandle socket,
    const XNetUdpOptions *options
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**options** &emsp;TCP或UDP选项结构体。 结构见5-1-9。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-29"></a>

### 5-1-29 xapi\_NetGetUdpOptions();

该函数将会读取UDP广播等选项。

**函数参数**

```cpp
XNetResult xapi_NetGetUdpOptions(
    XNetHandle socket,
    XNetUdpOptions *options
);
```

&emsp;**socket** &emsp;原生网络**socket**句柄。

&emsp;**options** &emsp;TCP或UDP选项结构体。 结构见5-1-9。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-30"></a>

### 5-1-30 xapi\_NetClose();

该函数将会关闭原生网络对象。socket、DNS查询、取消对象和变更监听均使用此函数释放。

**函数参数**

```cpp
XNetResult xapi_NetClose(XNetHandle object);
```

&emsp;**object** &emsp;原生网络对象句柄。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-31"></a>

### 5-1-31 xapi\_NetWaitMany();

该函数将会等待一个或多个原生网络对象的就绪事件，并写回每项的ready字段。

**函数参数**

```cpp
XNetResult xapi_NetWaitMany(
    XNetWaitItem *items,
    uint32_t count,
    const XNetIoOptions *io
);
```

&emsp;**items** &emsp;条目数组。控件接口中表示完整的目标控件布局。 结构见5-1-10。

&emsp;**count** &emsp;条目数量。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回就绪条目数量；超时返回0，失败返回负errno。

返回就绪项数量，超时为0，失败为负errno。终止条件不受兴趣事件掩码限制。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-1-25-2。

<a id="xapi-5-1-32"></a>

### 5-1-32 xapi\_NetCreateCancel();

该函数将会创建一个取消对象，可用于中断关联的等待和网络操作。

**函数参数**

```cpp
XNetResult xapi_NetCreateCancel(XNetHandle *cancel);
```

&emsp;**cancel** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-1-33"></a>

### 5-1-33 xapi\_NetSignalCancel();

该函数将会触发取消对象。取消是一次性的，触发后不能复位。

**函数参数**

```cpp
XNetResult xapi_NetSignalCancel(XNetHandle cancel);
```

&emsp;**cancel** &emsp;取消对象句柄，或用于接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2"></a>

## 5-2 DNS与配置

<a id="xapi-5-2-1"></a>

### 5-2-1 XNetResolveDesc类型

该类型用于存储主机名解析的输入参数。

**类型结构**

```cpp
typedef struct XNetResolveDesc
{
    uint32_t    size, version;
    const char *hostname;
    uint32_t    family, interface_id;
    uint16_t    port, reserved16;
    uint32_t    total_timeout_ms;
    XNetHandle  cancel;
    uint64_t    reserved[2];
} XNetResolveDesc;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**hostname** &emsp;待解析或连接的主机名。

&emsp;**family** &emsp;地址族。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**port** &emsp;主机字节序的端口号。

&emsp;**reserved16** &emsp;保留字段，输入时置零。

&emsp;**total\_timeout\_ms** &emsp;解析任务总超时，必须为正的毫秒数。

&emsp;**cancel** &emsp;关联的原生网络取消对象句柄。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-2-2"></a>

### 5-2-2 XNetInterfaceInfo类型

该类型用于存储网络接口及其当前状态。

**类型结构**

```cpp
typedef struct XNetInterfaceInfo
{
    uint32_t    size, version, interface_id, flags;
    uint32_t    mtu, ipv4_method, dhcp_state, connectivity;
    uint8_t     mac[6], reserved8[2];
    char        name[16];
    uint64_t    generation;
    XNetAddress gateway;
} XNetInterfaceInfo;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**mtu** &emsp;接口最大传输单元，单位字节。

&emsp;**ipv4\_method** &emsp;IPv4或DNS配置方式；HTTP中为请求方法字符串。

&emsp;**dhcp\_state** &emsp;DHCP运行状态。

&emsp;**connectivity** &emsp;连通性状态；未知不代表连接失败。

&emsp;**mac** &emsp;6字节MAC地址。

&emsp;**reserved8** &emsp;保留字段，输入时置零。

&emsp;**name** &emsp;名称字符串。

&emsp;**generation** &emsp;数据或接口状态的代际编号。

&emsp;**gateway** &emsp;默认网关地址。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-2-3"></a>

### 5-2-3 XNetInterfaceAddress类型

该类型用于存储网络接口地址及前缀长度。

**类型结构**

```cpp
typedef struct XNetInterfaceAddress
{
    XNetAddress address;
    uint32_t    prefix_bits, reserved;
} XNetInterfaceAddress;
```

&emsp;**address** &emsp;IP地址。

&emsp;**prefix\_bits** &emsp;网络前缀长度，以位计。

&emsp;**reserved** &emsp;保留字段，输入时置零。

<a id="xapi-5-2-4"></a>

### 5-2-4 XNetDnsConfig类型

该类型用于存储自动或手动DNS配置。

**类型结构**

```cpp
typedef struct XNetDnsConfig
{
    uint32_t    size, version, interface_id, method;
    uint32_t    server_count, reserved;
    XNetAddress servers[2];
} XNetDnsConfig;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**method** &emsp;IPv4或DNS配置方式；HTTP中为请求方法字符串。

&emsp;**server\_count** &emsp;有效DNS服务器数量。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**servers** &emsp;DNS服务器地址数组。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-2-5"></a>

### 5-2-5 XNetInterfaceConfig类型

该类型用于存储静态IPv4或DHCP配置。

**类型结构**

```cpp
typedef struct XNetInterfaceConfig
{
    uint32_t    size, version, interface_id, method;
    XNetAddress address, gateway;
    uint32_t    prefix_bits, reserved;
} XNetInterfaceConfig;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**method** &emsp;IPv4或DNS配置方式；HTTP中为请求方法字符串。

&emsp;**address** &emsp;IP地址。

&emsp;**gateway** &emsp;默认网关地址。

&emsp;**prefix\_bits** &emsp;网络前缀长度，以位计。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-2-6"></a>

### 5-2-6 XNetSavedConfig类型

该类型用于存储持久化网络策略及修订编号。

**类型结构**

```cpp
typedef struct XNetSavedConfig
{
    uint32_t            size, version, flags, reserved;
    uint64_t            revision;
    XNetInterfaceConfig ipv4;
    XNetDnsConfig       dns;
    uint64_t            reserved64[2];
} XNetSavedConfig;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**revision** &emsp;快照或候选内容的修订编号。

&emsp;**ipv4** &emsp;保存的IPv4及DNS配置。

&emsp;**dns** &emsp;保存的IPv4及DNS配置。

&emsp;**reserved64** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-2-7"></a>

### 5-2-7 XNetConfigStatus类型

该类型用于存储最近一次配置加载和应用结果。

**类型结构**

```cpp
typedef struct XNetConfigStatus
{
    uint32_t size, version, flags, reserved;
    uint64_t revision;
    int64_t  load_result, apply_result;
    uint64_t reserved64[2];
} XNetConfigStatus;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**reserved** &emsp;保留字段，输入时置零。

&emsp;**revision** &emsp;快照或候选内容的修订编号。

&emsp;**load\_result** &emsp;加载和应用配置的结果。

&emsp;**apply\_result** &emsp;加载和应用配置的结果。

&emsp;**reserved64** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-2-8"></a>

### 5-2-8 XNetChange类型

该类型用于存储合并后的网络变更通知。

**类型结构**

```cpp
typedef struct XNetChange
{
    uint32_t size, version, interface_id, flags;
    uint64_t generation;
} XNetChange;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**generation** &emsp;数据或接口状态的代际编号。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-2-9"></a>

### 5-2-9 xapi\_NetResolveStart();

该函数将会启动主机名解析。启动时复制主机名，查询由返回的句柄表示。

**函数参数**

```cpp
XNetResult xapi_NetResolveStart(
    const XNetResolveDesc *desc,
    XNetHandle *query
);
```

&emsp;**desc** &emsp;描述本次操作的输入结构体指针。 结构见5-2-1。

&emsp;**query** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

复制最多253字节的主机名。total\_timeout\_ms必须为正值，独立于等待调用的超时。family为0时选择受支持的地址族。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-1-12-1。

<a id="xapi-5-2-10"></a>

### 5-2-10 xapi\_NetResolveGetResult();

该函数将会取得已完成主机名解析的地址列表。结果在查询对象关闭前保持稳定。

**函数参数**

```cpp
XNetResult xapi_NetResolveGetResult(
    XNetHandle query,
    XNetEndpoint *endpoints,
    uint32_t capacity,
    uint32_t *required
);
```

&emsp;**query** &emsp;DNS查询句柄；Start时为接收句柄的指针。

&emsp;**endpoints** &emsp;用于接收解析结果的端点数组。 结构见5-1-4。

&emsp;**capacity** &emsp;输出缓冲区可以容纳的条目数；字节缓冲区接口以字节计。

&emsp;**required** &emsp;用于接收所需条目数；HTTP响应头接口中为包含结尾空字符的字节数。

返回值 &emsp;成功返回0，失败返回负errno。

尚未完成返回-EINPROGRESS。空缓冲区且capacity为0时查询所需条数；容量不足返回-ENOBUFS并写回required。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2-11"></a>

### 5-2-11 xapi\_NetEnumInterfaces();

该函数将会列出当前网络接口的编号。

**函数参数**

```cpp
XNetResult xapi_NetEnumInterfaces(
    XNetInterfaceId *interfaces,
    uint32_t capacity,
    uint32_t *required
);
```

&emsp;**interfaces** &emsp;用于接收网络接口编号的数组。

&emsp;**capacity** &emsp;输出缓冲区可以容纳的条目数；字节缓冲区接口以字节计。

&emsp;**required** &emsp;用于接收所需条目数；HTTP响应头接口中为包含结尾空字符的字节数。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2-12"></a>

### 5-2-12 xapi\_NetGetInterfaceInfo();

该函数将会获取网络接口的名称、MAC地址、链路状态、MTU和地址配置状态。

**函数参数**

```cpp
XNetResult xapi_NetGetInterfaceInfo(
    XNetInterfaceId interface_id,
    XNetInterfaceInfo *info
);
```

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见5-2-2。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_CONFIG\_STATIC | 1U | 使用静态IPv4配置。 |
| XNET\_CONFIG\_DHCP | 2U | 使用DHCP自动配置。 |
| XNET\_LINK\_UP | 1U | 物理或逻辑链路已接通。 |
| XNET\_STACK\_READY | 2U | 网络栈已准备好。 |
| XNET\_ADDRESS\_READY | 4U | IPv4地址已可用。 |
| XNET\_DEFAULT\_ROUTE | 8U | IPv4默认路由已可用。 |
| XNET\_DNS\_CONFIGURED | 16U | DNS服务器已配置。 |
| XNET\_IPV4\_ADDRESS\_READY | XNET\_ADDRESS\_READY | IPv4地址已可用。 |
| XNET\_IPV6\_ADDRESS\_READY | 32U | IPv6地址已可用。 |
| XNET\_IPV6\_GLOBAL\_READY | 64U | 全局IPv6地址已可用。 |
| XNET\_IPV6\_DEFAULT\_ROUTE | 128U | IPv6默认路由已可用。 |
| XNET\_CONNECTIVITY\_UNKNOWN | 0U | 尚未确认外部连通性。 |

<a id="table-5-2-12-1"></a>

**表格5-2-12-1 接口状态和配置方式**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2-13"></a>

### 5-2-13 xapi\_NetGetInterfaceAddresses();

该函数将会列出指定接口当前拥有的IP地址及前缀长度。

**函数参数**

```cpp
XNetResult xapi_NetGetInterfaceAddresses(
    XNetInterfaceId interface_id,
    XNetInterfaceAddress *addresses,
    uint32_t capacity,
    uint32_t *required
);
```

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**addresses** &emsp;用于接收接口地址及前缀长度的数组。 结构见5-2-3。

&emsp;**capacity** &emsp;输出缓冲区可以容纳的条目数；字节缓冲区接口以字节计。

&emsp;**required** &emsp;用于接收所需条目数；HTTP响应头接口中为包含结尾空字符的字节数。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-1-12-1。

<a id="xapi-5-2-14"></a>

### 5-2-14 xapi\_NetGetDnsConfig();

该函数将会读取当前DNS服务器配置。

**函数参数**

```cpp
XNetResult xapi_NetGetDnsConfig(XNetDnsConfig *config);
```

&emsp;**config** &emsp;网络接口、DNS或保存配置的结构体。 结构见5-2-4。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_DNS\_AUTO | 1U | 自动取得DNS配置。 |
| XNET\_DNS\_MANUAL | 2U | 手动指定DNS服务器。 |

<a id="table-5-2-14-1"></a>

**表格5-2-14-1 DNS配置方式**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2-15"></a>

### 5-2-15 xapi\_NetApplyInterfaceConfig();

该函数将会应用网络接口的运行时IPv4配置。该操作不会自动保存到持久配置。

**函数参数**

```cpp
XNetResult xapi_NetApplyInterfaceConfig(
    const XNetInterfaceConfig *config
);
```

&emsp;**config** &emsp;网络接口、DNS或保存配置的结构体。 结构见5-2-5。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-2-12-1。

<a id="xapi-5-2-16"></a>

### 5-2-16 xapi\_NetApplyDnsConfig();

该函数将会应用运行时DNS配置。该操作不会自动保存到持久配置。

**函数参数**

```cpp
XNetResult xapi_NetApplyDnsConfig(const XNetDnsConfig *config);
```

&emsp;**config** &emsp;网络接口、DNS或保存配置的结构体。 结构见5-2-4。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-2-14-1。

<a id="xapi-5-2-17"></a>

### 5-2-17 xapi\_NetGetSavedConfig();

该函数将会读取保存的网络配置及其修订编号。

**函数参数**

```cpp
XNetResult xapi_NetGetSavedConfig(XNetSavedConfig *config);
```

&emsp;**config** &emsp;网络接口、DNS或保存配置的结构体。 结构见5-2-6。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_SAVED\_ENABLED | 1U | 保存的配置已启用。 |
| XNET\_SAVED\_RECOVERED | 2U | 配置从恢复副本读取。 |
| XNET\_CONFIG\_ANY\_REVISION | (~0ULL) | 保存时不要求修订编号匹配。 |

<a id="table-5-2-17-1"></a>

**表格5-2-17-1 保存配置标志**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2-18"></a>

### 5-2-18 xapi\_NetSaveConfig();

该函数将会保存网络配置，但不会立即改变运行时网络状态。

**函数参数**

```cpp
XNetResult xapi_NetSaveConfig(const XNetSavedConfig *config);
```

&emsp;**config** &emsp;网络接口、DNS或保存配置的结构体。 结构见5-2-6。

返回值 &emsp;成功返回0，失败返回负errno。

需要ChangeSettings权限。revision用于检查配置是否被其他写入更新；显式使用XNET\_CONFIG\_ANY\_REVISION会覆盖当前快照。保存不等于应用。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-2-17-1。

<a id="xapi-5-2-19"></a>

### 5-2-19 xapi\_NetReloadConfig();

该函数将会重新读取并应用保存的网络配置。配置会先完成校验，再尝试应用。

**函数参数**

```cpp
XNetResult xapi_NetReloadConfig(void);
```

返回值 &emsp;成功返回0，失败返回负errno。

需要ChangeSettings权限。组合应用不是原子操作；失败后应查询实际运行状态。缺失或禁用的配置不覆盖运行时设置。

本接口所用常量及相关状态说明请参见表格5-1-11-1、表格5-2-17-1。

<a id="xapi-5-2-20"></a>

### 5-2-20 xapi\_NetGetConfigStatus();

该函数将会查询最近一次启动或显式重新加载配置的结果。

**函数参数**

```cpp
XNetResult xapi_NetGetConfigStatus(XNetConfigStatus *status);
```

&emsp;**status** &emsp;用于接收当前状态的结构体指针。 结构见5-2-7。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_CONFIG\_DONE | 1U | 最近一次加载尝试已结束，仍需检查结果。 |
| XNET\_CONFIG\_ENABLED | 2U | 此次加载的配置已启用。 |
| XNET\_CONFIG\_RECOVERED | 4U | 此次加载使用了恢复副本。 |
| XNET\_CONFIG\_APPLIED | 8U | 配置已应用。 |

<a id="table-5-2-20-1"></a>

**表格5-2-20-1 配置加载状态**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2-21"></a>

### 5-2-21 xapi\_NetWatchCreate();

该函数将会创建网络状态变更监听。接口编号为0时监听全部接口。

**函数参数**

```cpp
XNetResult xapi_NetWatchCreate(
    XNetInterfaceId interface_id,
    XNetHandle *watch
);
```

&emsp;**interface\_id** &emsp;网络接口编号。

&emsp;**watch** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-2-22"></a>

### 5-2-22 xapi\_NetWatchRead();

该函数将会读取合并后的网络变更通知。收到重新同步标志时，应重新查询完整状态。

**函数参数**

```cpp
XNetResult xapi_NetWatchRead(
    XNetHandle watch,
    XNetChange *change
);
```

&emsp;**watch** &emsp;网络变更监听句柄；Create时为接收句柄的指针。

&emsp;**change** &emsp;用于接收网络变更的结构体。 结构见5-2-8。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XNET\_CHANGE\_RESYNC | 1U | 应重新读取完整网络状态。 |

<a id="table-5-2-22-1"></a>

**表格5-2-22-1 变更同步标志**

本接口所用常量及相关状态说明请参见表格5-1-11-1。

<a id="xapi-5-3"></a>

## 5-3 TLS

<a id="xapi-5-3-1"></a>

### 5-3-1 XTlsConnectDesc类型

该类型用于存储TLS连接和信任配置。

**类型结构**

```cpp
typedef struct XTlsConnectDesc
{
    uint32_t    size, version;
    const char *host;
    const char *server_name;
    uint32_t    port, total_timeout_ms;
    const void *ca_data;
    uint64_t    ca_bytes;
    const char *ca_file;
    XNetHandle  cancel;
    uint64_t    reserved[2];
} XTlsConnectDesc;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**host** &emsp;待解析或连接的主机名。

&emsp;**server\_name** &emsp;证书名称及SNI；NULL时使用host。

&emsp;**port** &emsp;主机字节序的端口号。

&emsp;**total\_timeout\_ms** &emsp;整体超时毫秒数，0使用30000。

&emsp;**ca\_data** &emsp;CA证书内存、其字节数或CA文件路径；内存和文件输入互斥。

&emsp;**ca\_bytes** &emsp;CA证书内存、其字节数或CA文件路径；内存和文件输入互斥。

&emsp;**ca\_file** &emsp;CA证书内存、其字节数或CA文件路径；内存和文件输入互斥。

&emsp;**cancel** &emsp;关联的原生网络取消对象句柄。

&emsp;**reserved** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-3-2"></a>

### 5-3-2 XTlsPeerInfo类型

该类型用于存储TLS状态、协议及证书校验结果。

**类型结构**

```cpp
typedef struct XTlsPeerInfo
{
    uint32_t     size, version, state, events;
    int64_t      result;
    int32_t      backend_error;
    uint32_t     failure, verify_flags, buffered_bytes;
    XNetEndpoint peer;
    char         server_name[256], protocol[16], cipher[96];
} XTlsPeerInfo;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**state** &emsp;对象当前状态，使用对应接口的状态常量。

&emsp;**events** &emsp;当前事件位。

&emsp;**result** &emsp;操作结果；负数表示失败。

&emsp;**backend\_error** &emsp;TLS后端原始错误码。

&emsp;**failure** &emsp;TLS失败分类。

&emsp;**verify\_flags** &emsp;证书校验错误位。

&emsp;**buffered\_bytes** &emsp;已缓冲的可读字节数。

&emsp;**peer** &emsp;本地或对端地址和端口。

&emsp;**server\_name** &emsp;TLS证书名称校验及SNI使用的服务器名称。

&emsp;**protocol** &emsp;协商的TLS协议和密码套件名称。

&emsp;**cipher** &emsp;协商的TLS协议和密码套件名称。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-3-3"></a>

### 5-3-3 xapi\_TlsConnectStart();

该函数将会创建TLS连接操作，准备信任证书、解析地址、连接并进行TLS握手。

**函数参数**

```cpp
XNetResult xapi_TlsConnectStart(
    const XTlsConnectDesc *desc,
    XTlsHandle *tls
);
```

&emsp;**desc** &emsp;描述本次操作的输入结构体指针。 结构见5-3-1。

&emsp;**tls** &emsp;用于接收新建对象句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

信任输入为空时使用系统CA。Start复制输入，通过Wait/Send/Receive推进操作，不创建专用用户线程。TLS始终验证证书；TLS句柄不能传给NetWaitMany或NetClose。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XTLS\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XTLS\_PREPARING | 1U | 准备连接所需资源和信任数据。 |
| XTLS\_RESOLVING | 2U | 正在解析主机名。 |
| XTLS\_CONNECTING | 3U | 正在建立连接。 |
| XTLS\_HANDSHAKING | 4U | 正在进行TLS握手。 |
| XTLS\_READY | 5U | 已准备好。 |
| XTLS\_FAILED | 6U | 发生错误。 |
| XTLS\_MAX\_CA\_BYTES | (4U \* 1024U \* 1024U) | CA证书数据字节数上限。 |

<a id="table-5-3-3-1"></a>

**表格5-3-3-1 TLS版本、连接状态和CA容量**

<a id="xapi-5-3-4"></a>

### 5-3-4 xapi\_TlsWait();

该函数将会推进TLS连接并等待指定事件。

**函数参数**

```cpp
XNetResult xapi_TlsWait(
    XTlsHandle tls,
    uint32_t mask,
    const XNetIoOptions *io,
    uint32_t *events
);
```

&emsp;**tls** &emsp;TLS操作句柄；Start时为接收句柄的指针。

&emsp;**mask** &emsp;需要等待的事件位，可按位或组合。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

&emsp;**events** &emsp;用于接收实际事件位的指针。

返回值 &emsp;有事件返回1，未就绪或等待超时返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XTLS\_EVENT\_READY | 1U | TLS连接可以使用。 |
| XTLS\_READABLE | 2U | 可以读取数据。 |
| XTLS\_WRITABLE | 4U | 可以写入数据。 |
| XTLS\_EOF | 8U | 已到达数据结束。 |
| XTLS\_ERROR | 16U | 发生错误。 |
| XTLS\_EVENTS\_ALL | 31U | 该接口所有已定义事件位。 |

<a id="table-5-3-4-1"></a>

**表格5-3-4-1 TLS事件**

本接口所用常量及相关状态说明请参见表格5-3-3-1。

<a id="xapi-5-3-5"></a>

### 5-3-5 xapi\_TlsGetPeerInfo();

该函数将会读取TLS状态、对端、协议、密码套件及证书校验结果。

**函数参数**

```cpp
XNetResult xapi_TlsGetPeerInfo(
    XTlsHandle tls,
    XTlsPeerInfo *info
);
```

&emsp;**tls** &emsp;TLS操作句柄；Start时为接收句柄的指针。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见5-3-2。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XTLS\_FAILURE\_NONE | 0U | 没有失败。 |
| XTLS\_FAILURE\_TRUST | 1U | 信任证书准备失败。 |
| XTLS\_FAILURE\_VERIFY | 2U | 证书校验失败。 |
| XTLS\_FAILURE\_ENTROPY | 3U | 安全随机数来源失败。 |
| XTLS\_FAILURE\_CLOCK | 4U | 系统时间无法用于证书校验。 |
| XTLS\_FAILURE\_PROTOCOL | 5U | TLS协议失败。 |
| XTLS\_FAILURE\_TRANSPORT | 6U | 底层网络传输失败。 |
| XTLS\_CERT\_EXPIRED | 1U | 证书已过期。 |
| XTLS\_CERT\_FUTURE | 2U | 证书尚未生效。 |
| XTLS\_CERT\_NAME | 4U | 证书名称不匹配。 |
| XTLS\_CERT\_UNTRUSTED | 8U | 证书链不受信任。 |
| XTLS\_CERT\_OTHER | 16U | 其他证书校验错误。 |

<a id="table-5-3-5-1"></a>

**表格5-3-5-1 TLS失败分类和证书状态**

本接口所用常量及相关状态说明请参见表格5-3-3-1、表格5-3-4-1。

<a id="xapi-5-3-6"></a>

### 5-3-6 xapi\_TlsSend();

该函数将会通过TLS连接发送数据，返回实际接受的字节数。

**函数参数**

```cpp
XNetResult xapi_TlsSend(
    XTlsHandle tls,
    const void *data,
    uint64_t bytes,
    const XNetIoOptions *io
);
```

&emsp;**tls** &emsp;TLS操作句柄；Start时为接收句柄的指针。

&emsp;**data** &emsp;待发送的只读数据缓冲区。

&emsp;**bytes** &emsp;数据长度，单位字节。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回传输字节数，失败返回负errno；读取结束的含义见正文说明。

立即发送返回-EAGAIN时，SDK可能保留最多16384字节的待发副本；重试应提供相同前缀，否则返回-EBUSY。有限超时会终止连接。

本接口所用常量及相关状态说明请参见表格5-3-3-1。

<a id="xapi-5-3-7"></a>

### 5-3-7 xapi\_TlsReceive();

该函数将会从TLS连接接收解密后的数据。

**函数参数**

```cpp
XNetResult xapi_TlsReceive(
    XTlsHandle tls,
    void *data,
    uint64_t capacity,
    const XNetIoOptions *io
);
```

&emsp;**tls** &emsp;TLS操作句柄；Start时为接收句柄的指针。

&emsp;**data** &emsp;用于接收数据的可写缓冲区。

&emsp;**capacity** &emsp;输出缓冲区容量，单位字节。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回传输字节数，失败返回负errno；读取结束的含义见正文说明。

本接口所用常量及相关状态说明请参见表格5-3-3-1。

<a id="xapi-5-3-8"></a>

### 5-3-8 xapi\_TlsShutdown();

该函数将会发送TLS关闭通知。之后仍可读取对端剩余数据。

**函数参数**

```cpp
XNetResult xapi_TlsShutdown(
    XTlsHandle tls,
    const XNetIoOptions *io
);
```

&emsp;**tls** &emsp;TLS操作句柄；Start时为接收句柄的指针。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-3-3-1。

<a id="xapi-5-3-9"></a>

### 5-3-9 xapi\_TlsCancel();

该函数将会取消正在进行的TLS操作并唤醒活动调用。

**函数参数**

```cpp
XNetResult xapi_TlsCancel(XTlsHandle tls);
```

&emsp;**tls** &emsp;TLS操作句柄；Start时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-3-3-1。

<a id="xapi-5-3-10"></a>

### 5-3-10 xapi\_TlsClose();

该函数将会立即取消TLS操作并释放连接资源。

**函数参数**

```cpp
XNetResult xapi_TlsClose(XTlsHandle tls);
```

&emsp;**tls** &emsp;TLS操作句柄；Start时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-3-3-1。

<a id="xapi-5-4"></a>

## 5-4 HTTP

<a id="xapi-5-4-1"></a>

### 5-4-1 XHttpHeader类型

该类型用于存储一个HTTP请求头名称和值。

**类型结构**

```cpp
typedef struct XHttpHeader
{
    const char *name, *value;
} XHttpHeader;
```

&emsp;**name** &emsp;请求头字段名称字符串。

&emsp;**value** &emsp;请求头字段值字符串。

<a id="xapi-5-4-2"></a>

### 5-4-2 XHttpRequestDesc类型

该类型用于存储HTTP请求的地址、方法、请求头及请求体。

**类型结构**

```cpp
typedef struct XHttpRequestDesc
{
    uint32_t           size, version;
    const char        *url;
    const char        *method;
    const XHttpHeader *headers;
    uint32_t           header_count, max_redirects;
    const void        *body;
    uint64_t           body_bytes;
    int32_t            total_timeout_ms;
    union
    {
        uint32_t flags;
        uint32_t reserved;
    };
    uint64_t           max_response_bytes;
    XNetHandle         cancel;
    const void        *ca_data;
    uint64_t           ca_bytes;
    const char        *ca_file;
    uint64_t           reserved2[2];
} XHttpRequestDesc;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**url** &emsp;请求URL。

&emsp;**method** &emsp;HTTP请求方法字符串，NULL表示GET。

&emsp;**headers** &emsp;请求头数组及条数。

&emsp;**header\_count** &emsp;请求头数组及条数。

&emsp;**max\_redirects** &emsp;允许跟随的重定向次数，0表示直接返回3xx，最大10。

&emsp;**body** &emsp;请求体只读数据地址。

&emsp;**body\_bytes** &emsp;请求体长度，单位字节。

&emsp;**total\_timeout\_ms** &emsp;整体超时毫秒数，0使用30000，-1表示无整体截止时间。

&emsp;**flags** &emsp;请求标志，当前允许显式连接复用；与reserved共用同一存储。

&emsp;**reserved** &emsp;flags的旧名称，用于源代码兼容；两者不是独立字段。

&emsp;**max\_response\_bytes** &emsp;允许的响应体总字节数上限，0表示不设置总量限制。

&emsp;**cancel** &emsp;关联的原生网络取消对象句柄。

&emsp;**ca\_data** &emsp;CA证书内存、其字节数或CA文件路径；内存和文件输入互斥。

&emsp;**ca\_bytes** &emsp;CA证书内存、其字节数或CA文件路径；内存和文件输入互斥。

&emsp;**ca\_file** &emsp;CA证书内存、其字节数或CA文件路径；内存和文件输入互斥。

&emsp;**reserved2** &emsp;保留字段，输入时置零。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-4-3"></a>

### 5-4-3 XHttpResponseInfo类型

该类型用于存储HTTP响应状态、长度及最终地址。

**类型结构**

```cpp
typedef struct XHttpResponseInfo
{
    uint32_t size, version, state, events;
    uint32_t status_code, flags, header_count, redirects;
    int64_t  result;
    uint64_t content_length, body_bytes;
    char     final_url[XHTTP_MAX_URL_BYTES];
} XHttpResponseInfo;
```

&emsp;**size** &emsp;结构体长度，调用前填写sizeof(该结构体)。

&emsp;**version** &emsp;接口版本，使用所属接口的版本宏。

&emsp;**state** &emsp;对象当前状态，使用对应接口的状态常量。

&emsp;**events** &emsp;当前事件位。

&emsp;**status\_code** &emsp;HTTP响应状态码。

&emsp;**flags** &emsp;该结构体所属接口的标志位集合。

&emsp;**header\_count** &emsp;请求头数组及条数。

&emsp;**redirects** &emsp;已经跟随的重定向次数。

&emsp;**result** &emsp;操作结果；负数表示失败。

&emsp;**content\_length** &emsp;响应内容长度，需结合长度有效标志解释。

&emsp;**body\_bytes** &emsp;已处理响应体的字节数。

&emsp;**final\_url** &emsp;经过重定向后的最终URL。

调用前请填写size和version，并将输入结构中的保留字段置零。相关版本及状态常量见本节函数下方的表格。

<a id="xapi-5-4-4"></a>

### 5-4-4 xapi\_HttpRequestStart();

该函数将会创建HTTP或HTTPS请求，复制URL、请求头和请求体等输入数据。

**函数参数**

```cpp
XNetResult xapi_HttpRequestStart(
    const XHttpRequestDesc *desc,
    XHttpHandle *request
);
```

&emsp;**desc** &emsp;描述本次操作的输入结构体指针。 结构见5-4-2。

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

请求头和固定请求体在Start时复制。HTTPS始终校验证书。响应体采用有界缓冲流式读取；4xx/5xx为HTTP状态码，并非传输错误。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XHTTP\_ABI\_VERSION | 1U | 当前接口的版本号。 |
| XHTTP\_CONNECTING | 1U | 正在建立连接。 |
| XHTTP\_SENDING | 2U | 正在发送请求。 |
| XHTTP\_READING\_HEADERS | 3U | 正在读取响应头。 |
| XHTTP\_READING\_BODY | 4U | 正在读取响应体。 |
| XHTTP\_COMPLETE | 5U | 操作已经完成。 |
| XHTTP\_FAILED | 6U | 发生错误。 |
| XHTTP\_REUSE\_CONNECTION | 1U | 显式允许当前进程内GET/HEAD连接复用。 |
| XHTTP\_MAX\_REQUEST\_BYTES | (1024U \* 1024U) | 请求体字节数上限。 |
| XHTTP\_MAX\_HEADERS | 64U | 请求头条数上限。 |
| XHTTP\_MAX\_HEADER\_BYTES | 32768U | 响应头字节数上限。 |
| XHTTP\_MAX\_URL\_BYTES | 4096U | URL缓冲区字节数上限。 |

<a id="table-5-4-4-1"></a>

**表格5-4-4-1 HTTP版本、状态、复用和上限**

<a id="xapi-5-4-5"></a>

### 5-4-5 xapi\_HttpWait();

该函数将会推进HTTP请求并等待响应头、响应体或结束事件。

**函数参数**

```cpp
XNetResult xapi_HttpWait(
    XHttpHandle request,
    uint32_t mask,
    const XNetIoOptions *io,
    uint32_t *events
);
```

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

&emsp;**mask** &emsp;需要等待的事件位，可按位或组合。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

&emsp;**events** &emsp;用于接收实际事件位的指针。

返回值 &emsp;有事件返回1，未就绪或等待超时返回0，失败返回负errno。

Wait和Read协作推进请求。有尚未读取的响应体时，只等待DONE可能返回0，需继续Read消耗数据。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XHTTP\_HEADERS\_READY | 1U | 响应头已经可查询。 |
| XHTTP\_BODY\_READY | 2U | 有响应体可以读取。 |
| XHTTP\_DONE | 4U | 操作已经完成。 |
| XHTTP\_ERROR | 8U | 发生错误。 |
| XHTTP\_EVENTS\_ALL | 15U | 该接口所有已定义事件位。 |

<a id="table-5-4-5-1"></a>

**表格5-4-5-1 HTTP事件**

本接口所用常量及相关状态说明请参见表格5-4-4-1。

<a id="xapi-5-4-6"></a>

### 5-4-6 xapi\_HttpGetResponseInfo();

该函数将会获取请求状态、HTTP状态码、响应长度和最终URL。

**函数参数**

```cpp
XNetResult xapi_HttpGetResponseInfo(
    XHttpHandle request,
    XHttpResponseInfo *info
);
```

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见5-4-3。

返回值 &emsp;成功返回0，失败返回负errno。

| 名称 | 值 | 用途 |
| --- | --- | --- |
| XHTTP\_LENGTH\_KNOWN | 1U | 响应内容长度已知。 |
| XHTTP\_CHUNKED | 2U | 响应使用分块传输。 |

<a id="table-5-4-6-1"></a>

**表格5-4-6-1 HTTP长度标志**

本接口所用常量及相关状态说明请参见表格5-4-4-1、表格5-4-5-1。

<a id="xapi-5-4-7"></a>

### 5-4-7 xapi\_HttpGetTlsInfo();

该函数将会获取HTTPS请求使用的TLS连接信息。

**函数参数**

```cpp
XNetResult xapi_HttpGetTlsInfo(
    XHttpHandle request,
    XTlsPeerInfo *info
);
```

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

&emsp;**info** &emsp;用于接收查询结果的结构体指针。 结构见5-3-2。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-4-4-1。

<a id="xapi-5-4-8"></a>

### 5-4-8 xapi\_HttpGetHeader();

该函数将会按名称及序号读取响应头。名称不区分大小写，序号用于选择重复的字段。

**函数参数**

```cpp
XNetResult xapi_HttpGetHeader(
    XHttpHandle request,
    const char *name,
    uint32_t index,
    char *value,
    uint32_t capacity,
    uint32_t *required
);
```

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

&emsp;**name** &emsp;要查询的HTTP响应头名称，不区分大小写。

&emsp;**index** &emsp;从0开始的下标或同名响应头序号。

&emsp;**value** &emsp;用于接收响应头值的字符缓冲区。

&emsp;**capacity** &emsp;输出缓冲区容量，单位字节。

&emsp;**required** &emsp;用于接收所需条目数；HTTP响应头接口中为包含结尾空字符的字节数。

返回值 &emsp;成功返回0，失败返回负errno。

required包含结尾空字符。value为NULL且capacity为0时只查询长度；字段不存在返回-ENOENT，空间不足返回-ENOBUFS。

本接口所用常量及相关状态说明请参见表格5-4-4-1。

<a id="xapi-5-4-9"></a>

### 5-4-9 xapi\_HttpRead();

该函数将会流式读取响应体，不要求一次分配整个响应的缓冲区。

**函数参数**

```cpp
XNetResult xapi_HttpRead(
    XHttpHandle request,
    void *data,
    uint64_t capacity,
    const XNetIoOptions *io
);
```

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

&emsp;**data** &emsp;用于接收数据的可写缓冲区。

&emsp;**capacity** &emsp;输出缓冲区容量，单位字节。

&emsp;**io** &emsp;超时和取消选项；为空时立即操作。 结构见5-1-5。

返回值 &emsp;成功返回传输字节数，失败返回负errno；读取结束的含义见正文说明。

本接口所用常量及相关状态说明请参见表格5-4-4-1。

<a id="xapi-5-4-10"></a>

### 5-4-10 xapi\_HttpCancel();

该函数将会取消HTTP请求并唤醒正在等待的调用。

**函数参数**

```cpp
XNetResult xapi_HttpCancel(XHttpHandle request);
```

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-4-4-1。

<a id="xapi-5-4-11"></a>

### 5-4-11 xapi\_HttpClose();

该函数将会释放HTTP请求及其资源。

**函数参数**

```cpp
XNetResult xapi_HttpClose(XHttpHandle request);
```

&emsp;**request** &emsp;HTTP请求句柄；RequestStart时为接收句柄的指针。

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-4-4-1。

<a id="xapi-5-4-12"></a>

### 5-4-12 xapi\_HttpCloseIdleConnections();

该函数将会关闭当前进程中空闲的可复用HTTP连接，不影响仍在处理的请求。

**函数参数**

```cpp
XNetResult xapi_HttpCloseIdleConnections(void);
```

返回值 &emsp;成功返回0，失败返回负errno。

本接口所用常量及相关状态说明请参见表格5-4-4-1。

<a id="xapi-5-4-13"></a>

### 5-4-13 xapi\_httpGet();

该函数将会发送一次简化的HTTP GET请求，并返回分配好的响应正文字符串。

**函数参数**

```cpp
char * xapi_httpGet(const char *url, uint16_t port, bool tls);
```

&emsp;**url** &emsp;请求的URL。

&emsp;**port** &emsp;端口号，0表示按是否使用TLS选择默认端口。

&emsp;**tls** &emsp;是否使用TLS。

返回值 &emsp;成功返回分配的正文字符串；请求失败、内存不足或没有可返回数据时返回NULL。

port为0时按tls选择80或443。返回的字符串由调用者使用free释放。此接口以字符串处理结果，不适合包含空字符的二进制响应；需要流式读取、响应头或详细错误时请使用XHttp接口。

<a id="xapi-6"></a>

# CHAPTER 6 – BridgeEngine API

**BridgeEngine** **API**

本章节将会介绍鹊桥引擎的BAPI。

<a id="xapi-6-1"></a>

## 6-1 简介

&emsp;BridgeEngine（鹊桥引擎）是由XINGJI工作室开发的一款跨平台图形库及2.5D游戏引擎。**请移步BridgeEngine** **BAPI标准文档。**

<a id="xapi-7"></a>

# CHAPTER 7 – Stardust UI

**Stardust UI**

本章节将会介绍XINGJI星尘跨平台UI框架。

<a id="xapi-7-1"></a>

## 7-1 简介

&emsp;Stardust UI（星尘UI）是由XINGJI工作室开发的一款跨平台的UI框架。请移步StardustUI文档（https://github.com/xingji-studio/StardustUI）。
