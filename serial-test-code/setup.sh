

# Check if python installed
if ! [ -x "$(command -v pip)" ]; then
  echo "Please install python first!"
  exit 1
fi

echo "Installing pyserial..."
# pip install pyserial

echo
echo "Now you can run the command"
echo
echo "    python `dirname "$0"`/my-pyserial-code.py"
echo
echo "to make python communicate with the pi!"

# todo: must use python 3