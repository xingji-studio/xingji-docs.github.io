# XJ380 API 规范 (C++) 版本 1.3

**注意：本手册由 AI 从 PDF 转换而来，内容可能不准确，请以官网上的 PDF版为准！**

**注意：本手册由 AI 从 PDF 转换而来，内容可能不准确，请以官网上的 PDF版为准！**

**注意：本手册由 AI 从 PDF 转换而来，内容可能不准确，请以官网上的 PDF版为准！**

**2026/5/14 VERSION 1.3**

版权所有 © XINGJI Interactive Software 2017 - 2026 保留所有权利。“星际工作室”XINGJI 工作室“XINGJI Studios”均为 XINGJI Interactive Software 的别名。“XJ380”“XJ380OS”“XJ380 操作系统”均为 XJ380 操作系统的别名，归 XINGJI Interactive Software 所有。“BridgeEngine”“鹊桥引擎”“bapi”均为 BridgeEngine 的别名，归 XINGJI Interactive Software 及其旗下工作室 XINGJI Games 所有。“xapi”“XJ380 API”“XJ380 应用程序接口”均为 XJ380 API 别名，归 XINGJI Interactive Software 所有。除适用于 POSIX 标准的 XJ380 API 外最终解释权归 XINGJI 工作室所有。适用于 POSIX 标准的 XJ380 API 最终解释权归 IEEE 所有。本手册由 XINGJI 董事会组织编写。工作室总部地址：太阳宫南街 8 号。请勿邮寄任何快递，寄往此地址的快递我们不会收货（也没法收货）。如有邮寄需要，请联系 XINGJI 工作室董事会。更多信息请参见 XINGJI 工作室官网（[www.xingjisoft.com](http://www.xingjisoft.com)）。

## 目录

- CHAPTER 1 - 关于、编译和专有类型
  - 1.1 关于
  - 1.2 编译为XJ380应用程序
  - 1.3 专有类型概览
  - 1.4 用户及权限
  - 1.5 辨别XJ380环境
- CHAPTER 2 - XJ380 API (POSIX版)
  - 2.1 简介
- CHAPTER 3 - XJ380 API (XAPI版)
  - 3.1 文本输入输出
    - 3.1.1 xapi_Output()
    - 3.1.2 xapi_Input()
    - 3.1.3 xapi_Getline()
    - 3.1.4 xapi_Getch()
    - 3.1.5 xapi_EndLine()
    - 3.1.6 xapi_PrintLine()
    - 3.1.7 xapi_Printf()
    - 3.1.8 xapi_OutputSerial()
  - 3.2 文件操作
    - 3.2.1 XFILE类型
    - 3.2.2 xapi_OpenFile()
    - 3.2.3 xapi_CloseFile()
    - 3.2.4 xapi_SearchFile()
    - 3.2.5 xapi_Mkdir()
    - 3.2.6 xapi_CreateFile()
    - 3.2.7 xapi_DeleteFile()
    - 3.2.8 xapi_RenameFile()
    - 3.2.9 xapi_ReadFile()
    - 3.2.10 xapi_WriteFile()
    - 3.2.11 xapi_Rmdir()
  - 3.3 类型转换
    - 3.3.1 xcr_char2int()
    - 3.3.2 xcr_int2char()
    - 3.3.3 xcr_hex2char()
    - 3.3.4 xcr_toRGB()
    - 3.3.5 xcr_toRGBA()
  - 3.4 进程与线程
    - 3.4.1 xapi_Fork()
    - 3.4.2 xapi_Execve()
    - 3.4.3 xapi_Exit()
    - 3.4.4 xapi_GetTaskList()
    - 3.4.5 xapi_KillPrcoess()
  - 3.5 获取当前信息
    - 3.5.1 xapi_GetSystemVersion()
    - 3.5.2 xapi_GetTime()
    - 3.5.3 xapi_GetCurrentUser()
    - 3.5.4 xapi_GetTimeX()
    - 3.5.5 xapi_GetCpuModel()
    - 3.5.6 xapi_GetMemorySize()
  - 3.6 系统消息及服务
    - 3.6.1 xapi_Broken()
    - 3.6.2 xapi_SendAppMessage()
    - 3.6.3 xapi_Sleep()
    - 3.6.4 xapi_Run()
    - 3.6.5 xapi_FlushTime()
  - 3.7 内存
    - 3.7.1 xapi_AllocateMemory()
    - 3.7.2 xapi_FreeMemory()
    - 3.7.3 xapi_MapMemory()
- CHAPTER 4 – XJ380 API (XAPI GUI 版)
  - 4.1 创建图形化应用程序
    - 4.1.1 XWINDOW类型
    - 4.1.2 xapi_CreateWindow()
    - 4.1.3 xapi_SetWindowTitle()
    - 4.1.4 xapi_CloseWindow()
    - 4.1.5 xapi_SetIcon()
    - 4.1.6 xapi_GetWindowSize()
  - 4.2 绘图
    - 4.2.1 xapi_DrawPoint()
    - 4.2.2 xapi_DrawLine()
    - 4.2.3 xapi_DrawRect()
    - 4.2.4 xapi_DrawCircle()
    - 4.2.5 xapi_DrawText()
    - 4.2.6 xapi_DrawTextl()
    - 4.2.7 xapi_DrawSWText()
    - 4.2.8 xapi_CalcTextWidth()
    - 4.2.9 xapi_DrawSVG()
    - 4.2.10 xapi_DrawFA()
  - 4.3 插入图片
    - 4.3.1 xapi_DrawBMP()
    - 4.3.2 xapi_DrawPNG()
    - 4.3.3 xapi_DrawPicture()
    - 4.3.4 xapi_GetPicSize()
  - 4.4 消息处理
    - 4.4.1 消息处理函数
    - 4.4.2 键盘消息
      - 4.4.2.1 CHAR消息
    - 4.4.3 鼠标消息
      - 4.4.3.1 MOVE消息
      - 4.4.3.2 LBUTTON消息
      - 4.4.3.3 RBUTTON消息
      - 4.4.3.4 MBUTTON消息
      - 4.4.3.5 ROLLER消息
    - 4.4.4 控件消息
    - 4.4.5 刷新消息
  - 4.5 对 framebuffer 进行操作
    - 4.5.1 xapi_ReadBuffer()
    - 4.5.2 xapi_WriteBuffer()
    - 4.5.3 xapi_ReadBufferA()
    - 4.5.4 xapi_WriteBufferA()
    - 4.5.5 xapi_RefreshWindow()
    - 4.5.6 xapi_RefreshPartWindow()
  - 4.6 控件
    - 4.6.1 按钮控件
      - 4.6.1.1 xapi_Button()
      - 4.6.1.2 xapi_EmptButton()
      - 4.6.1.3 xapi_DeleteButton()
    - 4.7.1 右键菜单控件
      - 4.7.1.1 xapi_RegisterRightButtonMenu()
      - 4.7.1.2 xapi_DeleteRightButtonMenu()
- CHAPTER 5 - BridgeEngine API
  - 5.1 简介
- CHAPTER 6 - Stardust UI
  - 6.1 简介

---

## CHAPTER 1 - 关于、编译和专有类型

**ABOUT, COMPILE AND EXCLUSIVE TYPE**

本章节将会介绍本篇手册以及XJ380 API的相关信息、如何编译为XJ380应用程序（EPF）以及本手册内的所有专有类型。

### 1-1 关于

XJ380 API由3（或4）部分组成：兼容POSIX的XJ380 API、XAPI版XJ380 API和带GUI的XAPI版XJ380 API（XJ380 Professional Edition或更高版本默认集成BridgeEngine引擎，可使用BAPI。详见BridgeEngine API标准文档）。其中兼容POSIX的XJ380 API和XAPI版XJ380 API仅可创建控制台程序。带GUI的XAPI版XJ380 API和BridgeEngine BAPI可用于创建图形化应用程序。这3（或4）种API可以混合使用。

### 1-2 编译为XJ380应用程序

您可以在 [https://www.xingjisoft.top/os/xj380/download](https://www.xingjisoft.top/os/xj380/download) 处下载XJ380应用程序编译套件，或使用SpaceCode系列编辑器进行编译（须安装额外模块）。请您仔细阅读套件中的配置指南并配置环境。您也可以自行链接XAPI库。请务必使用 C++11 或更高标准，并编译为ELF/EPF格式。EPF格式编译套件已包含在XJ380应用程序编译套件中。您需要引入下列头文件的其中至少一个：

| 头文件               | 用途                                         |
| -------------------- | -------------------------------------------- |
| x3api.h              | 引入所有XJ380 API（除BAPI）（建议使用）       |
| xposix.h             | 引入POSIX版XJ380 API                         |
| xguiapi.h            | 引入XAPI（GUI版）                            |
| xtuiapi.h            | 引入XAPI（无GUI版）                          |
| xapi.h               | 引入所有XAPI（建议使用）                     |
| BridgeEngine.h       | 引入所有BAPI                                 |
| x4api.h              | 引入所有XJ380 API                            |
| krlibc.h             | 常用函数库                                   |
| xposix/*.h           | 部分C标准库                                  |

除bapi外，这些头文件均可以在XJ380应用程序编译套件中的include文件夹找到。bapi相关头文件可以在BridgeEngine开发套件中找到。请您务必按照要求编写主函数。主函数格式如下：

#### 主函数格式

```c
int main(int argc, char* argv, char* envp);
```

其中argv为传参数，envp为当前用户环境变量。

#### 编译为XJ380图形化应用程序（EPF版）

使用XJ380开发套件中的XXCC（XINGJI XJ380 C++ Compiler）进行编译和链接。编译参数与 G++ 参数相同。由于XJ380程序的特殊性，我们只建议您使用 -O、-g 两种参数。

```bash
xXcc [编译选项] <源文件> -o <输出文件>
```

#### 编译为XJ380终端应用程序（EPF版）

使用XJ380开发套件中的XXCCTe（XINGJI XJ380 C++ Compiler Terminal Edition）进行编译和链接。编译参数与 G++ 参数相同。由于XJ380程序的特殊性，我们只建议您使用 -O、-g 两种参数。

```bash
xxccte [编译选项] <源文件> -o <输出文件>
```

#### 使用XJ380编译套件编译为XJ380图形化应用程序（ELF版）

使用XJ380开发套件中的XXCC-elf（XINGJI XJ380 C++ Compiler）进行编译和链接。编译参数与 G++ 参数相同。由于XJ380程序的特殊性，我们只建议您使用 -O、-g 两种参数。

```bash
xxcc-elf [编译选项] <源文件> -o <输出文件>
```

#### 使用XJ380编译套件编译为XJ380终端应用程序（ELF版）

使用XJ380开发套件中的XXCCTe-elf（XINGJI XJ380 C++ Compiler Terminal Edition）进行编译和链接。编译参数与 G++ 参数相同。由于XJ380程序的特殊性，我们只建议您使用 -O、-g 两种参数。

```bash
xxccte-elf [编译选项] <源文件> -o <输出文件>
```

#### 使用其他编译器编译为XJ380应用程序（ELF版）

我们将会为您提供参数用于编译和连接。这里拿clang++和ld举例。

```bash
clang++ -freestanding -fno-builtin -m64 -std=c++11 -fno-stack-protector -fno-exceptions -fshort-wchar -nostdinc -c <源文件> -o <目标文件> -D_XJ380_OS_
ld -Ttext=0x200000 <所有XAPI TUI/GUI目标文件> <目标文件> -o <输出文件>
```

#### 使用其他编译器编译为XJ380应用程序（C语言版）

在 C++ 版本上给前面加上即可。

如果您要编译为终端应用程序，请链接XAPI TUI目标文件；反之请链接XAPI GUI目标文件。两种XAPI目标文件已分别存放在编译套件中。（您可以根据需要对 -std 参数进行调整，但必须保证其高于11版）

### 1-3 专有类型概览

| 类型名称       | 长度（字节） | 概述                                                         |
| -------------- | ------------ | ------------------------------------------------------------ |
| INT8           | 1            | 8位整型                                                      |
| UINT8          | 1            | 无符号8位整型                                                |
| INT16          | 2            | 16位整型                                                     |
| UINT16         | 2            | 无符号16位整型                                               |
| INT32          | 4            | 32位整型                                                     |
| UINT32         | 4            | 无符号32位整型                                               |
| INT64          | 8            | 64位整型                                                     |
| UINT64         | 8            | 无符号64位整型                                               |
| WSTR           | -            | char类型字符串，使用UTF8编码                                 |
| XWINDOW        | 详见4-1-1    | 窗口类型                                                     |
| XFILE          | 详见3-2-1    | 文件类型                                                     |
| XCOLOR         | 6            | 包含3个无符号8位整型（未对齐）。格式：RGB                    |
| XCOLORA        | 8            | 包含4个无符号8位整型。格式：RGBA                             |
| HDLE           | 8            | 窗口句柄。                                                   |
| UserInfo       | 详见1-4      | 用户信息结构。                                               |
| XapiTaskList   | 详见3-4-4    | 任务调度列表。                                               |

*表格 1-3-1*

### 1-4 用户及权限

XJ380的用户共分为5类（见表格1-4-1）。权限共分为7类：读文件（R）、写文件（W）、更改设置（CS）、访问其他目录（NV）、访问系统目录（SV）、读系统文件（SR）、写系统文件（SW）。各类用户所拥有的权限及特权级请参见下表。

| 用户类别  | 特权级（x86） | R   | W   | CS  | NV  | SV  | SR  | SW  |
| --------- | ------------- | --- | --- | --- | --- | --- | --- | --- |
| Root      | 0             | Y   | Y   | Y   | Y   | Y   | Y   | Y   |
| System    | 3             | Y   | Y   | Y   | Y   | Y   | Y   | N   |
| Admin     | 3             | Y   | Y   | Y   | Y/N | Y   | N   | N   |
| Visitor   | 3             | Y   | Y   | N   | N   | N   | N   | N   |
| Custom    | 3             | -   | -   | -   | -   | -   | -   | -   |

*表格 1-4-1*

（Y为拥有该权限，N为无权限，- 为由用户自定义，Y/N代表需要用户手动许可）

XJ380会默认创建一个Admin权限的用户（用户名和密码由用户自行设置），并且用户最高可通过输入密码（详细方法请见官方教程，System密码默认为114514，可通过设置更改）获取System权限。

没有访问其他目录权限的应用程序仅可访问其所正在运行的程序所在目录及其子目录。其中具有Admin权限的应用程序在访问其他目录时，系统会向用户发送一个访问请求，经用户手动输入密码并批准后，该程序才可访问其他目录。

系统目录包括/system和/EFI目录以及其所有子目录，这里面的所有文件都一定是系统文件。

应用程序启动时，会自动将程序所属用户设置为当前登录用户，如果该线程是由其他进程/线程通过调用fork或execve生成，将会继承其父线程/进程所属用户。

目前应用程序无法自行提升权限。

### 1-5 辨别XJ380环境

XXCC2026v2或更高版本在编译时会自动定义一个名为 `_XJ380_OS_` 的宏。

---

## CHAPTER 2 - XJ380 API (POSIX版)

**XJ380 API (POSIX EDITION)**

XJ380 API (POSIX 版) 遵守且兼容一部分 POSIX 标准。

### 2-1 简介

XJ380 API (POSIX 版) 是遵守 POSIX 标准的 API。

---

## CHAPTER 3 - XJ380 API (XAPI版)

**XJ380 API (XAPI EDITION)**

XJ380 API (XAPI 版) 是由 XINGJI Interactive Software 自主设计的 API 标准。所有 XAPI 均向下兼容低版本。3-3 中的类型转换函数严格意义上并不算做 API，但作为 XAPI 提供的一部分仍被写在这里。

### 3-1 文本输入输出

#### 3-1-1 xapi_Output()

该函数将会向控制台输出一段字符串。

**函数参数**

```c
void xapi_Output(WSTR str);
```

- `str`：将要输出的字符串。

返回值：无

#### 3-1-2 xapi_Input()

该函数将会从控制台读取字符串直到空格。在读取到字符串前不会继续执行。

**函数参数**

```c
void xapi_Input(WSTR str);
```

返回值：获取的字符串。

#### 3-1-3 xapi_Getline()

该函数将会从控制台读取字符串直到换行。在读取到字符串前不会继续执行。

**函数参数**

```c
void xapi_Getline(WSTR str);
```

- `str`：用于存储输入数据的字符串。

返回值：无

#### 3-1-4 xapi_Getch()

该函数将会从控制台读取字符。在读取到字符前不会继续执行。

**函数参数**

```c
char xapi_Getch(void);
```

返回值：获取的字符。

#### 3-1-5 xapi_EndLine()

该函数将会向控制台输出换行。

**函数参数**

```c
void xapi_EndLine(void);
```

返回值：无

#### 3-1-6 xapi_PrintLine()

该函数将会向控制台输出一段字符串并换行。

**函数参数**

```c
void xapi_PrintLine(WSTR str);
```

- `str`：将要输出的字符串。

返回值：无

#### 3-1-7 xapi_Printf()

与 C/C++ 标准内的printf用法相同。

#### 3-1-8 xapi_OutputSerial()

该函数将会向该电脑的串行端口输出一段字符串。

**函数参数**

```c
void xapi_OutputSerial(WSTR str);
```

- `str`：将要输出的字符串。

返回值：无

### 3-2 文件操作

#### 3-2-1 XFILE 类型

**类型结构**

```c
typedef struct {
    UINT64 length;
    void* buffer;
} XFILE;
```

- `length`：文件长度（单位字节）。
- `buffer`：文件内容。

#### 3-2-2 xapi_OpenFile()

该函数将会打开文件并读取。

**函数参数**

```c
XFILE* xapi_OpenFile(WSTR path);
```

- `path`：文件路径。

返回值：指向 XFILE 类型结构的指针。如果执行后为 NULL 则代表读取失败。

#### 3-2-3 xapi_CloseFile()

该函数将会将传入结构体的内容保存至文件后关闭文件并释放内存。

**函数参数**

```c
void xapi_CloseFile(XFILE** fsptr);
```

- `fsptr`：指向 XFILE 类型结构体的指针。执行后会被设置为空指针。

返回值：无

#### 3-2-4 xapi_SearchFile()

该函数将会搜索指定目录下的所有文件/文件名称并返回。最多返回 255 项，超出 255 项时将会把 count 的值设置为 256。如果找不到指定路径，将会把 count 的值设置为 404。

**函数参数**

```c
void xapi_SearchFile(WSTR path, WSTR** result, UINT64* count);
```

- `path`：路径。
- `result`：结果。
- `count`：条目数。

返回值：无

#### 3-2-5 xapi_Mkdir()

该函数将会创建一个文件夹。

**函数参数**

```c
void xapi_Mkdir(WSTR path);
```

- `path`：指定目录的路径（包含要创建的文件夹）。

返回值：无

#### 3-2-6 xapi_CreateFile()

该函数将会创建文件。

**函数参数**

```c
void xapi_CreateFile(WSTR path);
```

- `path`：文件路径。

返回值：无

#### 3-2-7 xapi_DeleteFile()

该函数将会删除指定文件。

**函数参数**

```c
void xapi_DeleteFile(WSTR path);
```

- `path`：指定文件的路径。

返回值：无

#### 3-2-8 xapi_RenameFile()

该函数将会重命名指定文件。

**函数参数**

```c
void xapi_RenameFile(WSTR old_path, WSTR new_path);
```

- `old_path`：源文件路径。
- `new_path`：目标文件路径。

返回值：无

#### 3-2-9 xapi_ReadFile()

该函数将会读取指定文件。

**函数参数**

```c
void xapi_ReadFile(WSTR filename, char* buffer, UINT64 size, UINT64 offset);
```

- `filename`：文件路径。
- `buffer`：指向一个用于存储目标内容的变量的指针。
- `size`：读取长度。
- `offset`：起始位置相对于文件起始的偏移。

返回值：无

#### 3-2-10 xapi_WriteFile()

该函数将会写入指定文件。

**函数参数**

```c
void xapi_WriteFile(WSTR filename, char* buffer, UINT64 size, UINT64 offset);
```

- `filename`：文件路径。
- `buffer`：指向一个用于存储源内容的变量的指针。
- `size`：写入长度。
- `offset`：起始位置相对于文件起始的偏移。

返回值：无

#### 3-2-11 xapi_Rmdir()

该函数将会删除指定文件夹。

**函数参数**

```c
void xapi_Rmdir(WSTR path);
```

- `path`：指定目录的路径。

返回值：无

### 3-3 类型转换

#### 3-3-1 xcr_char2int()

该函数将会把字符串转换为整型。

**函数参数**

```c
UINT64 xcr_char2int(WSTR str);
```

- `str`：字符串。

返回值：整型。

#### 3-3-2 xcr_int2char()

该函数将会把整型转换为字符串。

**函数参数**

```c
WSTR xcr_int2char(UINT64 dec);
```

- `dec`：整型。

返回值：字符串。

#### 3-3-3 xcr_hex2char()

该函数将会把整型转换为16进制格式的字符串。

**函数参数**

```c
WSTR xcr_hex2char(UINT64 hex);
```

- `hex`：整型。

返回值：字符串。

#### 3-3-4 toRGB()

该函数将会将3份数据（分别代表RGB）转换为32位整型（RGBA）格式。

**函数参数**

```c
UINT32 toRGB(UINT8 r, UINT8 g, UINT8 b);
```

- `r`：整型。代表R通道。
- `g`：整型。代表G通道。
- `b`：整型。代表B通道。

返回值：RGBA格式的整型。

#### 3-3-5 toRGBA()

该函数将会将32位整型格式（ARGB）转换为32位整型（RGBA）格式。

**函数参数**

```c
UINT32 toRGBA(UINT32 color);
```

- `color`：整型，格式为ARGB。

返回值：RGBA格式的整型。

#### 3-3-6 CC()

该宏将会将32位整型格式（ARGB）转换为32位整型（RGBA）格式。

**函数参数**

```c
UINT32 CC(UINT32 color);
```

- `color`：整型，格式为ARGB。

返回值：RGBA格式的整型。

### 3-4 进程与线程

#### 3-4-1 xapi_Fork()

该函数会复制当前进程映像至新进程，子进程将从fork()后开始运行。

**函数参数**

```c
UINT64 xapi_Fork(void);
```

返回值：父进程返回子进程PID，子进程返回0。

#### 3-4-2 xapi_Execve()

该函数会使目的可执行文件替换当前进程映像。

**函数参数**

```c
UINT64 xapi_Execve(WSTR filename, WSTR argv[], WSTR envp[]);
```

- `filename`：可执行文件路径。
- `argv[]`：传给新程序的命令行参数字符串数组。
- `envp[]`：传给新程序的环境变量字符串数组。

返回值：无（执行成功）；-1（执行失败）。

#### 3-4-3 xapi_Exit()

该函数会退出当前线程。

**函数参数**

```c
UINT64 xapi_Exit(UINT64 value);
```

- `value`：返回值。

返回值：无。

#### 3-4-4 xapi_GetTaskList()

该函数会获取操作系统当前任务调度列表。

**函数参数**

```c
UINT64 xapi_GetTaskList(XapiTaskInfo* buffer, UINT64 max_count);
```

- `buffer`：指向用于存储进程信息的指针。
- `max_count`：最大条目数。

返回值：无。

#### 3-4-5 xapi_KillProcess()

该函数会关闭指定进程（对于内核进程无效）。

**函数参数**

```c
UINT64 xapi_KillProcess(UINT64 pid);
```

- `pid`：进程ID。

返回值：无。

### 3-5 获取当前信息

#### 3-5-1 xapi_GetSystemVersion()

该函数会返回一串字符串作为当前操作系统版本号。

**函数参数**

```c
void xapi_GetSystemVersion(WSTR version);
```

- `version`：指向一个空字符串的指针，版本号将会储存于此。

返回值：无。

#### 3-5-2 xapi_GetTime()

该函数会返回当前时间（单位：秒（从1980年开始））。

**函数参数**

```c
UINT64 xapi_GetTime(void);
```

返回值：当前时间（单位：秒（从1980年开始））。

#### 3-5-3 xapi_GetCurrentUser()

该函数会返回当前线程的用户（权限）信息。

**函数参数**

```c
void xapi_GetCurrentUser(UserInfo* user_info);
```

- `user_info`：指向一个用户结构体的指针，返回的信息将会储存于此。

返回值：无。

#### 3-5-4 xapi_GetTimeX()

该函数会返回当前计算后的时间信息。

**函数参数**

```c
void xapi_GetTimeX(TimeType* tm);
```

- `tm`：指向一个时间结构体的指针，返回的信息将会储存于此。详细变量对应数据请参考注释。

返回值：无。

#### 3-5-5 xapi_GetCpuModel()

该函数会返回一串字符串作为当前客户机的中央处理器型号。

**函数参数**

```c
void xapi_GetCpuModel(WSTR version);
```

- `version`：指向一个空字符串的指针，型号将会储存于此。

返回值：无。

#### 3-5-6 xapi_GetMemorySize()

该函数会返回当前客户机的内存大小（单位MB）。

**函数参数**

```c
UINT64 xapi_GetMemorySize(void);
```

返回值：内存大小（MB）。

### 3-6 系统消息及服务

#### 3-6-1 xapi_Broken()

该函数会结束当前程序并弹出“应用程序崩溃”对话框。

**函数参数**

```c
void xapi_Broken(WSTR broken_info);
```

- `broken_info`：自定义需要显示的崩溃信息。可以为NULL。

返回值：无。

#### 3-6-2 xapi_SendAppMessage()

该函数会发送一个消息通知。

**函数参数**

```c
void xapi_SendAppMessage(WSTR title, WSTR text);
```

- `title`：需要显示的消息标题。
- `text`：需要显示的消息文本。

返回值：无。

#### 3-6-3 xapi_Sleep()

该函数会进行休眠。单位为毫秒（不保证绝对准确，有一定误差）。

**函数参数**

```c
void xapi_Sleep(UINT64 ms);
```

- `ms`：休眠时长（单位：毫秒）。

返回值：无。

#### 3-6-4 xapi_Run()

该函数会使用默认方式打开指定的程序或文件。

**函数参数**

```c
void xapi_Run(WSTR path);
```

- `path`：程序或文件的路径。

返回值：无。

#### 3-6-5 xapi_FlushTime()

该函数会刷新当前的时间偏移量。

**函数参数**

```c
void xapi_FlushTime(void);
```

返回值：无。

### 3-7 内存

#### 3-7-1 xapi_AllocateMemory()

该函数会分配一块指定大小的内存。

**函数参数**

```c
void* xapi_AllocateMemory(UINT64 size);
```

- `size`：申请的内存大小（单位：字节）。

返回值：指向分配的内存，如为NULL则代表分配失败。

#### 3-7-2 xapi_FreeMemory()

该函数会释放一块指定大小的内存。

**函数参数**

```c
void xapi_FreeMemory(void* ptr);
```

- `ptr`：指向要释放的内存指针。

返回值：无。

#### 3-7-3 xapi_MapMemory()

该函数会映射一块指定大小的内存到指定位置。

**函数参数**

```c
void* xapi_MapMemory(void* addr, UINT64 size, UINT32 flags);
```

- `addr`：映射起始地址。为NULL时则由内核选择。
- `size`：映射范围（单位：字节）。
- `flags`：标志位，见下表。

返回值：映射区域的起始地址。

| 宏                 | 说明               |
| ------------------ | ------------------ |
| PTE_PRESENT        |                    |
| PTE_WRITEABLE      |                    |
| PTE_USER           |                    |
| PTE_FLAG_UP        |                    |
| PTE_HUGE           |                    |
| PTE_NO_EXECUTE     |                    |

*表格 3-7-3-1 标志位宏*

---

## CHAPTER 4 – XJ380 API (XAPI GUI 版)

**XJ380 API (XAPI GUI EDITION)**

本章节将会介绍XAPI的GUI版本。坐标系以窗口左上角（不含标题栏）为(0,0)。

### 4-1 创建图形化应用程序

#### 4-1-1 XWINDOW 类型

**类型结构**

```c
typedef struct {
    UINT32 width;
    UINT32 height;
    WSTR title;
    UINT8 sets;
} XWINDOW;
```

- `width`：窗口宽度。
- `height`：窗口高度（不包含标题栏）。
- `title`：标题。
- `sets`：窗口参数。如表格4-1-1-1。不可使用多个不同类型的参数。

| 参数                      | 说明                                 |
| ------------------------- | ------------------------------------ |
| XWIN_NORMAL 或未设置      | 使用默认设定。                       |
| XWIN_FRAME_OFF            | 创建无边框窗口。                     |
| XWIN_FULL_SCR             | 全屏（无边框）。                     |
| XWIN_SUPPORT_RESIZEABLE   | 可调整窗口大小（需搭配其他参数使用）。 |

*表格 4-1-1-1*

#### 4-1-2 xapi_CreateWindow()

该函数将会创建一个窗口。窗口被用户关闭后对应线程也将被结束。

**函数参数**

```c
void xapi_CreateWindow(HDLE* handle, XWINDOW* xwin);
```

- `handle`：指向窗口句柄的指针。即指向 HDLE 类型的变量的指针。
- `xwin`：一个指向存储了窗口参数的 XWINDOW 类型的指针。

返回值：无

#### 4-1-3 xapi_SetWindowTitle()

该函数将会设置窗口的标题。

**函数参数**

```c
void xapi_SetWindowTitle(HDLE handle, WSTR str);
```

- `handle`：窗口句柄。
- `str`：标题。

返回值：无

#### 4-1-4 xapi_CloseWindow()

该函数将会关闭窗口，但不会结束程序。

**函数参数**

```c
void xapi_CloseWindow(HDLE handle);
```

- `handle`：窗口句柄。

返回值：无

#### 4-1-5 xapi_SetIcon()

该函数将会设置窗口在任务栏的图标。

**函数参数**

```c
void xapi_SetIcon(HDLE handle, WSTR path);
```

- `handle`：窗口句柄。
- `path`：图标路径。需为 BMP/PNG/JPEG/GIF 格式，大小 16×16。

返回值：无

#### 4-1-6 xapi_GetWindowSize()

该函数将会获取窗口的长和宽。

**函数参数**

```c
void xapi_GetWindowSize(HDLE handle, UINT64* width, UINT64* height);
```

- `handle`：窗口句柄。
- `width`：窗口宽度。
- `height`：窗口高度。

返回值：无

### 4-2 绘图

#### 4-2-1 xapi_DrawPoint()

该函数将会在窗口上绘制点。

**函数参数**

```c
void xapi_DrawPoint(HDLE handle, UINT32 x, UINT32 y, UINT32 color);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：竖坐标。
- `color`：图形的颜色。采用RGBA（32位色）格式。

返回值：无

#### 4-2-2 xapi_DrawLine()

该函数将会在窗口上绘制线。

**函数参数**

```c
void xapi_DrawLine(HDLE handle, UINT32 x1, UINT32 y1, UINT32 x2, UINT32 y2, UINT32 color);
```

- `handle`：窗口句柄。
- `x1`：起始点横坐标。
- `y1`：起始点竖坐标。
- `x2`：中止点横坐标。
- `y2`：中止点竖坐标。
- `color`：图形的颜色。采用RGBA（32位色）格式。

返回值：无

#### 4-2-3 xapi_DrawRect()

该函数将会在窗口上绘制矩形。

**函数参数**

```c
void xapi_DrawRect(HDLE handle, UINT32 x1, UINT32 y1, UINT32 x2, UINT32 y2, UINT32 color, bool fill);
```

- `handle`：窗口句柄。
- `x1`：起始点横坐标。
- `y1`：起始点竖坐标。
- `x2`：中止点横坐标。
- `y2`：中止点竖坐标。
- `color`：图形的颜色。采用RGBA（32位色）格式。
- `fill`：是否为实心。

返回值：无

#### 4-2-4 xapi_DrawCircle()

该函数将会在窗口上绘制正圆。由于算法问题该函数被暂时移除。

#### 4-2-5 xapi_DrawText()

该函数将会在窗口上绘制字符串。

**函数参数**

```c
void xapi_DrawText(HDLE handle, UINT32 x, UINT32 y, WSTR str, UINT32 size, UINT32 color);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：竖坐标。
- `str`：字符串。
- `size`：字号（请注意单位不是像素）。
- `color`：图形的颜色。采用RGBA（32位色）格式。

返回值：无

#### 4-2-6 xapi_DrawTextl()

该函数将会在窗口上绘制字符串，并返回字符串绘制出来的宽度。

**函数参数**

```c
void xapi_DrawTextl(HDLE handle, UINT32 x, UINT32 y, WSTR str, UINT32 size, UINT32 color, UINT32* width);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：竖坐标。
- `str`：字符串。
- `size`：字号（请注意单位不是像素）。
- `color`：图形的颜色。采用RGBA（32位色）格式。
- `width`：字符串绘制出来的宽度（单位：像素），需传入一个指向uint32_t类型变量的指针。

返回值：无

#### 4-2-7 xapi_DrawSWText()

该函数将会在窗口上绘制等宽字符串。字符宽度约为9像素（含两字间距）。该字体大小恒为9像素宽、16像素高（中文为18像素宽）。

**函数参数**

```c
void xapi_DrawSWText(HDLE handle, UINT32 x, UINT32 y, WSTR str, UINT32 color);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：竖坐标。
- `str`：字符串。
- `color`：图形的颜色。采用RGBA（32位色）格式。

返回值：无

#### 4-2-8 xapi_CalcTextWidth()

该函数将会计算指定字符串在指定大小下的宽度。

**函数参数**

```c
UINT64 xapi_CalcTextWidth(WSTR str, UINT32 size);
```

- `str`：字符串。
- `size`：字号（请注意单位不是像素）。

返回值：宽度（单位：像素）

#### 4-2-9 xapi_DrawSVG()

该函数将会绘制矢量图形。

**函数参数**

```c
INT32 xapi_DrawSvg(HDLE handle, UINT32 x, UINT32 y, UINT32 width, WSTR svgText, bool enableTrans);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：纵坐标。
- `width`：宽度。
- `svgText`：SVG 字符串。
- `enableTrans`：是否反转颜色。

返回值：成功返回高度，失败返回 -1。

#### 4-2-10 xapi_DrawFA()

该函数将会绘制指定文件中的矢量图形。

**函数参数**

```c
INT32 xapi_DrawFA(HDLE handle, UINT32 x, UINT32 y, UINT32 width, WSTR name, bool enableTrans);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：纵坐标。
- `width`：宽度。
- `name`：文件名。
- `enableTrans`：是否反转颜色。

返回值：成功返回高度，失败返回 -1。

### 4-3 插入图片

#### 4-3-1 xapi_DrawBMP()

该函数将会在窗口上绘制BMP格式的图片。

**函数参数**

```c
void xapi_DrawBMP(HDLE handle, UINT32 x, UINT32 y, UINT32 width, UINT32 height, WSTR path);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：竖坐标。
- `width`：图片宽度（会进行拉伸）。
- `height`：图片高度（会进行拉伸）。
- `path`：图片路径。

返回值：无

#### 4-3-2 xapi_DrawPNG()

该函数将会在窗口上绘制PNG格式的图片。

**函数参数**

```c
void xapi_DrawPNG(HDLE handle, UINT32 x, UINT32 y, UINT32 width, UINT32 height, WSTR path);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：竖坐标。
- `width`：图片宽度（会进行拉伸）。
- `height`：图片高度（会进行拉伸）。
- `path`：图片路径。

返回值：无

#### 4-3-3 xapi_DrawPicture()

该函数将会在窗口上绘制PNG/BMP/JPEG/GIF/HDR格式的图片。

**函数参数**

```c
void xapi_DrawPicture(HDLE handle, UINT32 x, UINT32 y, UINT32 width, UINT32 height, WSTR path);
```

- `handle`：窗口句柄。
- `x`：横坐标。
- `y`：竖坐标。
- `width`：图片宽度（会进行拉伸）。
- `height`：图片高度（会进行拉伸）。
- `path`：图片路径。

返回值：无

#### 4-3-4 xapi_GetPicSize()

该函数将会读取PNG/BMP/JPEG/GIF/HDR格式的图片宽度和高度。

**函数参数**

```c
void xapi_GetPicSize(UINT32* width, UINT32* height, WSTR path);
```

- `width`：图片宽度。
- `height`：图片高度。
- `path`：图片路径。

返回值：无

### 4-4 消息处理

#### 4-4-1 消息处理函数

为了进行人机交互，应用程序需要自行设定一个消息处理函数用于处理除窗口操作外的其他操作。消息处理函数必须为固定格式，并通过 SetMsgPrcor() 进行设置。XJ380 会向处理函数传入消息类型码以及 128 位的数据。仅在选中该窗口时才会将消息传入该窗口。此外，消息处理程序是作为该程序所属进程底下的一个子线程运行的。

**消息处理函数固定格式：**

```c
void Function(UINT64 Type, UINT64 hData, UINT64 lData) {
    /* 代码 Code */
}
```

- `Type`：消息类型。用于识别消息。
- `hData`：数据（高64位）。不同消息的内容分布不同。
- `lData`：数据（低64位）。不同消息的内容分布不同。

#### 4-4-2 键盘消息

##### 4-4-2-1 CHAR消息

代表有字符输入。特殊按键（如F12、ESC、BACKSPACE等，具体请参考表格4-4-2-2-1）不会发送该消息。

- 消息识别码（宏）：`MSG_CHAR`
- 数据分布结构：
  - hData：保留
  - lData：UTF-8格式的字符

##### 4-4-2-2 SP_CHAR消息

代表有特殊按键被按下。普通字符不会发送此消息。

- 消息识别码（宏）：`MSG_SPCHAR`
- 数据分布结构：
  - hData：保留
  - lData：特殊按键编号

| 按键        | 编号        |
| ----------- | ----------- |
| Esc         | 128         |
| Backspace   | 同 vb?（原文如此） |

*表格 4-4-2-2-1*

#### 4-4-3 鼠标消息

##### 4-4-3-1 MOVE消息

代表鼠标进行了移动。（传入的X、Y为相对窗口坐标）

- 消息识别码（宏）：`MSG_MOVE`
- 数据分布结构：
  - hData：鼠标的X坐标
  - lData：鼠标的Y坐标

##### 4-4-3-2 LBUTTON消息

代表左键被按下后释放。

- 消息识别码（宏）：`MSG_LBUTTON`
- 数据分布结构：
  - hData：鼠标的X坐标
  - lData：鼠标的Y坐标

##### 4-4-3-3 RBUTTON消息

代表右键被按下后释放。

- 消息识别码（宏）：`MSG_RBUTTON`
- 数据分布结构：
  - hData：鼠标的X坐标
  - lData：鼠标的Y坐标

##### 4-4-3-4 MBUTTON消息

代表中键被按下后释放。

- 消息识别码（宏）：`MSG_MBUTTON`
- 数据分布结构：
  - hData：鼠标的X坐标
  - lData：鼠标的Y坐标

##### 4-4-3-5 ROLLER消息

代表滚轮被滚动。

- 消息识别码（宏）：`MSG_ROLLER`
- 数据分布结构：
  - hData：鼠标的X坐标、鼠标的Y坐标（原文如此，可能合并）
  - lData：鼠标的Z轴坐标偏移量（有符号）

#### 4-4-4 控件消息

用于接收控件消息，例如按钮被按下。

- 消息识别码（宏）：`MSG_CRL`
- 数据分布结构：
  - hData：控件识别码
  - lData：控件数据（不同控件数据不同）

#### 4-4-5 刷新消息

当窗口大小变动（如最大化或调整窗口大小），需要重绘窗口时将会发送此消息。

- 消息识别码（宏）：`MSG_RESIZE`
- 数据分布结构：
  - hData：保留
  - lData：保留

### 4-5 对 framebuffer 进行操作

用于直接操作窗口的 framebuffer。

#### 4-5-1 xapi_ReadBuffer()

该函数将会获取 framebuffer 中的指定区域。

**函数参数**

```c
void xapi_ReadBuffer(HDLE handle, UINT32 x, UINT32 y, UINT32 width, UINT32 height, XCOLOR* buffer);
```

- `handle`：窗口句柄。
- `x`：起始横坐标。
- `y`：起始竖坐标。
- `width`：宽度。
- `height`：高度。
- `buffer`：图像。

返回值：无

#### 4-5-2 xapi_WriteBuffer()

该函数将会写入framebuffer中的指定区域。

**函数参数**

```c
void xapi_WriteBuffer(HDLE handle, UINT32 x, UINT32 y, UINT32 width, UINT32 height, XCOLOR* buffer);
```

- `handle`：窗口句柄。
- `x`：起始横坐标。
- `y`：起始竖坐标。
- `width`：宽度。
- `height`：高度。
- `buffer`：图像。

返回值：无

#### 4-5-3 xapi_ReadBufferA()

该函数将会获取framebuffer中的指定区域（包含透明色）。

**函数参数**

```c
void xapi_ReadBufferA(HDLE handle, UINT32 x, UINT32 y, UINT32 width, UINT32 height, XCOLORA* buffer);
```

- `handle`：窗口句柄。
- `x`：起始横坐标。
- `y`：起始竖坐标。
- `width`：宽度。
- `height`：高度。
- `buffer`：图像（含Alpha通道）。

返回值：无

#### 4-5-4 xapi_WriteBufferA()

该函数将会写入framebuffer中的指定区域（包含透明色）。

**函数参数**

```c
void xapi_WriteBufferA(HDLE handle, UINT32 x, UINT32 y, UINT32 width, UINT32 height, XCOLORA* buffer);
```

- `handle`：窗口句柄。
- `x`：起始横坐标。
- `y`：起始竖坐标。
- `width`：宽度。
- `height`：高度。
- `buffer`：图像（含Alpha通道）。

返回值：无

#### 4-5-5 xapi_RefreshWindow()

该函数将会刷新整个窗口。

**函数参数**

```c
void xapi_RefreshWindow(HDLE handle);
```

- `handle`：窗口句柄。

#### 4-5-6 xapi_RefreshPartWindow()

该函数将会刷新部分窗口。

**函数参数**

```c
void xapi_RefreshPartWindow(HDLE handle, UINT32 x1, UINT32 y1, UINT32 x2, UINT32 y2);
```

- `handle`：窗口句柄。
- `x1`：起始横坐标。
- `y1`：起始竖坐标。
- `x2`：结束横坐标。
- `y2`：结束竖坐标。

### 4-6 控件

用于更简易的创建用户界面。

#### 4-6-1 按钮控件

##### 4-6-1-1 xapi_Button()

该函数将会在窗口上创建一个按钮控件。高度为24像素，宽度为文本宽度+22像素，文本居中放置。

**函数参数**

```c
void xapi_Button(HDLE handle, UINT64 CRLid, UINT64 x, UINT64 y, WSTR text);
```

- `handle`：窗口句柄。
- `CRLid`：控件识别码。
- `x`：按钮左上角 x 坐标。
- `y`：按钮左上角 y 坐标。
- `text`：文本。

返回值：无；控件数据：无

##### 4-6-1-2 xapi_EmPButton()

该函数将会在窗口上创建一个蓝色按钮控件（可用于突出强调选项）。高度为24像素，宽度为文本宽度+22像素，文本居中放置。

**函数参数**

```c
void xapi_EmPButton(HDLE handle, UINT64 CRLid, UINT64 x, UINT64 y, WSTR text);
```

- `handle`：窗口句柄。
- `CRLid`：控件识别码。
- `x`：按钮左上角 x 坐标。
- `y`：按钮左上角 y 坐标。
- `text`：文本。

返回值：无；控件数据：无

##### 4-6-1-3 xapi_DeleteButton()

该函数将删除指定按钮（如果有多个对应识别码的按钮则删除最先创建的），但不会对按钮所在区域进行擦除。

**函数参数**

```c
void xapi_DeleteButton(HDLE handle, UINT64 CRLid);
```

- `handle`：窗口句柄。
- `CRLid`：控件识别码。

返回值：无；控件数据：无

#### 4-7-1 右键菜单控件

##### 4-6-1-1 RightMenuItem类型

该类型用于存储右键菜单的其中一个目录项。

**类型结构**

```c
typedef struct {
    UINT64 CRLid;
    WSTR text;
} RightMenuItem;
```

- `CRLid`：控件识别码。
- `text`：文本。

##### 4-6-1-2 xapi_RegisterRightButtonMenu()

该函数将会登记一个右键菜单。（不适用于全屏应用程序）

**函数参数**

```c
void xapi_RegisterRightButtonMenu(HDLE handle, RightMenuItem* items, UINT64 count);
```

- `handle`：窗口句柄。
- `items`：指向一个或多个右键菜单目录项开头的指针。
- `count`：目录项数量。

返回值：无；控件数据：无

##### 4-6-1-3 xapi_DeleteRightButtonMenu()

该函数将会删除登记的右键菜单。

**函数参数**

```c
void xapi_DeleteRightButtonMenu(HDLE handle);
```

- `handle`：窗口句柄。

返回值：无；控件数据：无

---

## CHAPTER 5 - BridgeEngine API

**BridgeEngine API**

本章节将会介绍鹊桥引擎的 BAPI。

### 5-1 简介

BridgeEngine（鹊桥引擎）是由 XINGJI 工作室开发的一款跨平台图形库及2.5D游戏引擎。请移步 BridgeEngine BAPI 标准文档。

---

## CHAPTER 6 - Stardust UI

**Stardust UI**

本章节将会介绍 XINGJI 星尘跨平台 UI 框架。

### 6-1 简介

Stardust UI（星尘UI）是由 XINGJI 工作室开发的一款跨平台的 UI 框架。请移步 StardustUI 文档（[https://github.com/xingji-studio/StardustUI](https://github.com/xingji-studio/StardustUI)）。
