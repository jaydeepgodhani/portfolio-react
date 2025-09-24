> go to the home dir
cd ~

> go to the home dir
cd

> present working directory
pwd

> go back one folder
cd ..

> change to that directory
pushd /etc/some

> again change it to previous directory
popd

> display type of file and encoding and all
file Readme.md

> find files with name of the file
locate somefile

> update database for locate
sudo updatedb

> finds other commands installed or not
which cal

> calender
cal

> 1000 previous commands
history

> display what cal command does
whatis cal

> displays which commands is time related, find typeOf command
apropos time

> manual page for man command
man man

> make directory junk
mkdir junk

> makes 3 dir
mkdir junk1 junk2 junk3

> creates new file or update the date in the file
touch temp.txt

> makes or updates 3 files at once
touch temp1 temp2 temp3

> copy bashrc into bashrc.bak if not there
cp bashrc bashrc.bak

> copy bashrc file from home folder to the temp folder
cp ~/.bashrc temp

> move bashrc file from home folder to the temp folder
mv ~/.bashrc temp

> rename file bashrc.bak to bashrc
mv bashrc.bak bashrc

> remove temp.txt
rm temp.txt

> recursively delete everything under temp folder
rm -r temp

> delete temp dir only if it's empty
rmdir temp

> delete all empty dir
rmdir *

> shows the content of files
cat file1

> append whatever on the screen into file2 (ctrl-D to end)
cat >> file2

> add text to the file
cat > file2

> display file content one by one
cat file1 file2

> read text file (Q to quit, space to jump page, search through it)
less file1

> output of ls copied to lsout.txt
ls > lsout.txt

> permanent root user
sudo -s

> switch user usr1 with switching home dir of usr1
su - usr1

> switch user usr1 with own home dir
su usr1

> shows loggedin users
users

> make file1 executable for everyone (rwz rwx rwx)
chmod +x file1

> chmod 700 file1
(rwx --- ---)

>chmod 755 dirs1
(rwx r-x r-x) for dir default

> chmod 644 file1
(rw- r-- r--)

> update command free -h every 2 second (ctrl-C to end)
watch free -h

> kill firefox process opened by you
killall firefox

## Key Binding

ctrl-C  >>  end process
ctrl-L  >>  clear terminal
ctrl-A  >>  move cursor start to line
ctrl-K >> clear after cursor
command-shift-+  >>  font bigger
command--  >>  font smaller
